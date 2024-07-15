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

export type BMS_RX2_Type = InferAttributes<BMS_RX2>;

@Table
export default class BMS_RX2 extends Model<BMS_RX2_Type> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  pack_dcl_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  pack_ccl_: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  pack_current_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  constant_val_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
