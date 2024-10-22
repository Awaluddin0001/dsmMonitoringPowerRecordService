import ExcelJS from "exceljs";
import moment from "moment-timezone";
import { Request, Response } from "express";
import { getPowerMeterModel } from "../models/powerMeterModel";
import pool from "../config/mySql";
import { RowDataPacket } from "mysql2";

interface PanelData {
  name: string;
  currentA: number;
  currentB: number;
  currentC: number;
  voltageRS: number;
  voltageST: number;
  voltageRT: number;
  activePowerTotal: number;
  apparentPower: number;
  frequency: number;
  powerMeter: string;
}

interface IPowerMeterData {
  timestamp: Date;
  itload: { value: number };
  facilityload: { value: number };
  pue: { value: number };
  panel1: PanelData;
  panel2: PanelData;
  panel3: PanelData;
  panel4: PanelData;
  panel5: PanelData;
  panel6: PanelData;
  panel7: PanelData;
}

// Create a type alias for all the possible panel names
type PanelKeys =
  | "panel1"
  | "panel2"
  | "panel3"
  | "panel4"
  | "panel5"
  | "panel6"
  | "panel7";

export const getPowersMeterData = async (req: Request, res: Response) => {
  // let connection;
  try {
    const connection = await pool.getConnection();
    const { filtertimestamp } = req.query;

    const query = `SELECT rectifier, timestamp FROM power`;
    const [rows] = await connection.query<RowDataPacket[]>(query);
    connection.release();
    const endTimestamp = filtertimestamp
      ? moment(filtertimestamp as string)
      : moment().tz("Asia/Singapore"); // UTC+8

    const startTimestamp = moment(endTimestamp).subtract(24, "hours");

    const year = endTimestamp.year();
    const quarter = Math.floor((endTimestamp.month() + 3) / 3);
    const collectionName = `${year}q${quarter}`;

    const PowerMeterModel = getPowerMeterModel(collectionName);

    const data = await PowerMeterModel.find({
      timestamp: {
        $gte: startTimestamp.toDate(),
        $lte: endTimestamp.toDate(),
      },
    }).exec();

    const temporaryData = data.map((e) => {
      if (
        e.panel3.apparentPower === 0 &&
        e.panel6.apparentPower === 0 &&
        e.panel7.apparentPower === 0
      ) {
        return {
          ...e.toObject(),
          itload: { value: e.itload.value + rows[rows.length - 1].rectifier },
          pue: {
            value:
              e.facilityload.value /
              (e.itload.value + rows[rows.length - 1].rectifier),
          },
        };
      }
    });

    res.json({ success: true, data: temporaryData });
  } catch (error) {
    console.error("Error fetching power meter data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const exportExcelPowerData = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const { starttimestamp, endtimestamp } = req.query;

    const query = `SELECT rectifier, timestamp FROM power`;
    const [rows] = await connection.query<RowDataPacket[]>(query);
    connection.release();

    // Handling timestamps
    const endTimestamp = endtimestamp
      ? moment(endtimestamp as string)
      : moment().tz("Asia/Singapore"); // Default to current time in Asia/Singapore timezone
    const startTimestamp = starttimestamp
      ? moment(starttimestamp as string)
      : moment(endTimestamp).subtract(24, "hours"); // Default to 24 hours before endTimestamp if not provided

    console.log("Received timestamps:", {
      starttimestamp: startTimestamp.format(),
      endtimestamp: endTimestamp.format(),
    });

    const year = endTimestamp.year();
    const quarter = Math.floor((endTimestamp.month() + 3) / 3);
    const collectionName = `${year}q${quarter}`;

    const PowerMeterModel = getPowerMeterModel(collectionName);

    // Fetch data from the database
    const data = await PowerMeterModel.find({
      timestamp: {
        $gte: startTimestamp.toDate(),
        $lte: endTimestamp.toDate(),
      },
    }).exec();

    const nameDate = startTimestamp.format("DD-MM-YYYY");

    // Process data with adjustments for certain panels
    const temporaryData = data.map((e) => {
      const item = e.toObject() as IPowerMeterData;
      if (
        item.panel3.apparentPower === 0 &&
        item.panel6.apparentPower === 0 &&
        item.panel7.apparentPower === 0
      ) {
        return {
          ...item,
          itload: {
            value: item.itload.value + rows[rows.length - 1].rectifier,
          },
          pue: {
            value:
              item.facilityload.value /
              (item.itload.value + rows[rows.length - 1].rectifier),
          },
        };
      }
      return item;
    });

    // Initialize Excel Workbook
    const workbook = new ExcelJS.Workbook();

    // Define common columns for each worksheet
    const columns = [
      { header: "Timestamp", key: "timestamp", width: 30 },
      { header: "Current A", key: "currentA", width: 15 },
      { header: "Current B", key: "currentB", width: 15 },
      { header: "Current C", key: "currentC", width: 15 },
      { header: "Voltage RS", key: "voltageRS", width: 15 },
      { header: "Voltage ST", key: "voltageST", width: 15 },
      { header: "Voltage RT", key: "voltageRT", width: 15 },
      { header: "Active Power", key: "activePower", width: 15 },
      { header: "Apparent Power", key: "apparentPower", width: 15 },
      { header: "Frequency", key: "frequency", width: 15 },
      { header: "Power Meter", key: "powerMeter", width: 20 },
    ];

    // Iterate over each panel and create a new sheet for each one
    (
      [
        "panel1",
        "panel2",
        "panel3",
        "panel4",
        "panel5",
        "panel6",
        "panel7",
      ] as PanelKeys[]
    ).forEach((panel) => {
      // Create a new worksheet for each panel
      const worksheet = workbook.addWorksheet(
        `Data ${panel === "panel1" ? "LVMDP1" : panel === "panel2" ? "LVMDP2" : panel === "panel3" ? "ACPDB1.18" : panel === "panel4" ? "UPS A" : panel === "panel5" ? "UPS B" : panel === "panel6" ? "ACPDB1.14" : "ACPDB1.16"}`
      );
      worksheet.columns = columns;

      // Add rows for each item in temporaryData
      temporaryData.forEach((item) => {
        const panelData = item[panel];

        if (panelData) {
          worksheet.addRow({
            timestamp: item.timestamp,
            currentA: panelData.currentA,
            currentB: panelData.currentB,
            currentC: panelData.currentC,
            voltageRS: panelData.voltageRS,
            voltageST: panelData.voltageST,
            voltageRT: panelData.voltageRT,
            activePower: panelData.activePowerTotal,
            apparentPower: panelData.apparentPower,
            frequency: panelData.frequency,
            powerMeter: panelData.powerMeter,
          });
        }
      });
    });

    // Add a summary sheet with all apparent power values in a single column
    const summaryWorksheet = workbook.addWorksheet("Summary Data");
    summaryWorksheet.columns = [
      { header: "Timestamp", key: "timestamp", width: 30 },
      { header: "Apparent Power (LVMDP1)", key: "apparentPower1", width: 20 },
      { header: "Apparent Power (LVMDP2)", key: "apparentPower2", width: 20 },
      {
        header: "Apparent Power (ACPDB1.18)",
        key: "apparentPower3",
        width: 20,
      },
      { header: "Apparent Power (UPS A)", key: "apparentPower4", width: 20 },
      { header: "Apparent Power (UPS B)", key: "apparentPower5", width: 20 },
      {
        header: "Apparent Power (ACPDB1.14)",
        key: "apparentPower6",
        width: 20,
      },
      {
        header: "Apparent Power (ACPDB1.16)",
        key: "apparentPower7",
        width: 20,
      },
      { header: "Facility Load", key: "facilityload", width: 15 },
      { header: "IT Load", key: "itload", width: 15 },
      { header: "PUE", key: "pue", width: 10 },
    ];

    temporaryData.forEach((item) => {
      summaryWorksheet.addRow({
        timestamp: item.timestamp,
        apparentPower1: item.panel1?.apparentPower || 0,
        apparentPower2: item.panel2?.apparentPower || 0,
        apparentPower3: item.panel3?.apparentPower || 0,
        apparentPower4: item.panel4?.apparentPower || 0,
        apparentPower5: item.panel5?.apparentPower || 0,
        apparentPower6: item.panel6?.apparentPower || 0,
        apparentPower7: item.panel7?.apparentPower || 0,
        facilityload: item.facilityload?.value,
        itload: item.itload?.value,
        pue: item.pue?.value,
      });
    });

    // Set headers for the response and send the file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=power_data_ttc_pengayoman_${nameDate}.xlsx`
    );

    // Write workbook to the response
    await workbook.xlsx.write(res);

    // End the response
    res.end();
  } catch (error) {
    console.error("Error fetching and exporting power meter data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
