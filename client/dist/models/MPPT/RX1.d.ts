import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type MPPT_RX1_Type = InferAttributes<MPPT_RX1>;
export default class MPPT_RX1 extends Model<MPPT_RX1_Type> {
    mpptNumber: number;
    outputVoltage: number;
    outputCurrent: number;
}
