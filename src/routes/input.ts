import { Router } from "express";
import { inputManualRectifier } from "../controllers/inputManual";

const manual = Router();

manual.post("/rectifier", inputManualRectifier);

export default manual;
