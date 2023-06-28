import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type Mitsuba_RX0_Type = InferAttributes<Mitsuba_RX0>;
export default class Mitsuba_RX0 extends Model<Mitsuba_RX0_Type> {
    battVoltage?: number;
    battCurrent?: number;
    motorCurrentPkAvg?: number;
    FETtemp?: number;
    motorRPM?: number;
    PWMDuty?: number;
    LeadAngle?: number;
}
