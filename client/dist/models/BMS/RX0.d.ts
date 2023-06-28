import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type BMS_RX0_Type = InferAttributes<BMS_RX0>;
export default class BMS_RX0 extends Model<BMS_RX0_Type> {
    low_cell_volt_: number;
    high_cell_volt_: number;
    avg_cell_volt_: number;
    pack_sum_volt_: number;
}
