import { Router } from "express";
import { getPowersMeterData } from "./../controllers/powerMeterController";

const router = Router();

router.get("/", getPowersMeterData);

export default router;
