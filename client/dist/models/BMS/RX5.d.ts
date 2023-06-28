import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type BMS_RX5_Type = InferAttributes<BMS_RX5>;
export default class BMS_RX5 extends Model<BMS_RX5_Type> {
    max_pack_dcl_: number;
    max_pack_ccl_: number;
    max_pack_volt_: number;
    min_pack_volt_: number;
}
