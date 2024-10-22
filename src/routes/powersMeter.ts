import { Router } from "express";
import {
  exportExcelPowerData,
  getPowersMeterData,
} from "../controllers/powerMeterController";

const powerMeter = Router();

powerMeter.get("/", getPowersMeterData);
powerMeter.get("/export-power", exportExcelPowerData);

export default powerMeter;
