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

export type BMS_RX3_Type = InferAttributes<BMS_RX3>;

@Table
export default class BMS_RX3 extends Model<BMS_RX3_Type> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  low_cell_res_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  high_cell_res_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  pack_res_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
