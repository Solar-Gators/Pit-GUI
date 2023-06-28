import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type MPPT_RX2_Type = InferAttributes<MPPT_RX2>;
export default class MPPT_RX2 extends Model<MPPT_RX2_Type> {
    mpptNumber: number;
    mosfetTemp: number;
    controllerTemp: number;
}
