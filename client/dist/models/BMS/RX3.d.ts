import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type BMS_RX3_Type = InferAttributes<BMS_RX3>;
export default class BMS_RX3 extends Model<BMS_RX3_Type> {
    low_cell_res_: number;
    high_cell_res_: number;
    pack_res_: number;
}
