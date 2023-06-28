import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type MPPT_RX3_Type = InferAttributes<MPPT_RX3>;
export default class MPPT_RX3 extends Model<MPPT_RX3_Type> {
    mpptNumber: number;
    aux12V: number;
    aux3V: number;
}
