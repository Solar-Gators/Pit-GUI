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

export type BMS_RX0_Type = InferAttributes<BMS_RX0>;

@Table
export default class BMS_RX0 extends Model<BMS_RX0_Type> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  low_cell_volt_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  high_cell_volt_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  avg_cell_volt_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  pack_sum_volt_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
