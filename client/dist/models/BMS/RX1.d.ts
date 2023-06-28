import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type BMS_RX1_Type = InferAttributes<BMS_RX1>;
export default class BMS_RX1 extends Model<BMS_RX1_Type> {
    high_temp_: number;
    high_temp_id_: number;
    low_temp_: number;
    low_temp_id_: number;
    avg_temp_: number;
    internal_temp_: number;
    constant_val_: number;
}
