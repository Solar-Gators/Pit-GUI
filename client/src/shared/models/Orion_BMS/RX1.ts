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

export type BMS_RX1_Type = InferAttributes<BMS_RX1>;

@Table
export default class BMS_RX1 extends Model<BMS_RX1_Type> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  high_temp_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  high_temp_id_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  low_temp_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  low_temp_id_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  avg_temp_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  internal_temp_: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  constant_val_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
