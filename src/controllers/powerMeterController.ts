import { Request, Response } from "express";
import mongoose from "mongoose";
import moment from "moment-timezone";

interface PowerMeterData extends mongoose.Document {
  timestamp: Date;
  panel1: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  panel2: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  panel3: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  panel4: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  panel5: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  panel6: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  panel7: {
    id: string;
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
    modbusId: number;
    status: boolean;
  };
  itload: {
    value: number;
  };
  facilityload: {
    value: number;
  };
  pue: {
    value: number;
  };
}

const getPowersMeterData = async (req: Request, res: Response) => {
  try {
    let { filtertimestamp } = req.query;
    const endTimestamp = filtertimestamp
      ? moment.tz(filtertimestamp as string, "Asia/Singapore")
      : moment().tz("Asia/Singapore"); // UTC+8

    const year = endTimestamp.year();
    const quarter = Math.floor((endTimestamp.month() + 3) / 3);
    const collectionName = `${year}q${quarter}`;

    const PowerMeterModel = mongoose.model<PowerMeterData>(
      collectionName,
      new mongoose.Schema({}, { strict: false })
    );

    const startTimestamp = moment(endTimestamp).subtract(24, "hours");

    const data = await PowerMeterModel.find({
      timestamp: {
        $gte: startTimestamp.toDate(),
        $lte: endTimestamp.toDate(),
      },
    }).exec();

    const formattedData = data.map((entry) => ({
      ...entry.toObject(),
      timestamp: moment(entry.timestamp)
        .tz("Asia/Singapore")
        .format("D MMMM YYYY HH:mm"),
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error("Error fetching power meter data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { getPowersMeterData };
