import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type MPPT_RX4_Type = InferAttributes<MPPT_RX4>;
export default class MPPT_RX4 extends Model<MPPT_RX4_Type> {
    mpptNumber: number;
    maxOutputVoltage: number;
    maxInputCurrent: number;
}
