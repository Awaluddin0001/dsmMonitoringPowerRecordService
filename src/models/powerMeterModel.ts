import { Schema, model, Document, Model } from "mongoose";

interface IPowerMeterData extends Document {
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

const PowerMeterDataSchema = new Schema({
  timestamp: { type: Date, required: true },
  panel1: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  panel2: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  panel3: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  panel4: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  panel5: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  panel6: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  panel7: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    currentA: { type: Number, default: 0 },
    currentB: { type: Number, default: 0 },
    currentC: { type: Number, default: 0 },
    voltageRS: { type: Number, default: 0 },
    voltageST: { type: Number, default: 0 },
    voltageRT: { type: Number, default: 0 },
    activePowerTotal: { type: Number, default: 0 },
    apparentPower: { type: Number, default: 0 },
    frequency: { type: Number, default: 0 },
    powerMeter: { type: String, default: "" },
    modbusId: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
  },
  itload: {
    value: { type: Number, default: 0 },
  },
  facilityload: {
    value: { type: Number, default: 0 },
  },
  pue: {
    value: { type: Number, default: 0 },
  },
});

export const getPowerMeterModel = (
  collectionName: string
): Model<IPowerMeterData> => {
  return model<IPowerMeterData>(
    collectionName,
    PowerMeterDataSchema,
    collectionName
  );
};
