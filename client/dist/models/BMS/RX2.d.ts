import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type BMS_RX2_Type = InferAttributes<BMS_RX2>;
export default class BMS_RX2 extends Model<BMS_RX2_Type> {
    pack_dcl_: number;
    pack_ccl_: number;
    pack_current_: number;
    constant_val_: number;
}
