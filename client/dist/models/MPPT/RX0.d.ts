import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type MPPT_RX0_Type = InferAttributes<MPPT_RX0>;
export default class MPPT_RX0 extends Model<MPPT_RX0_Type> {
    mpptNumber: number;
    inputVoltage: number;
    inputCurrent: number;
}
