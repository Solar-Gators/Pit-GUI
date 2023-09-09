"use strict";
"use strict";
import { InferAttributes } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  Index,
  CreatedAt,
} from "sequelize-typescript";

export type BMS_RX5_Type = InferAttributes<BMS_RX5>;

@Table
export default class BMS_RX5 extends Model<BMS_RX5_Type> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  max_pack_dcl_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  max_pack_ccl_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  max_pack_volt_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  min_pack_volt_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
