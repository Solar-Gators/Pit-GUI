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

export type MPPT_RX2_Type = InferAttributes<MPPT_RX2>;

@Table
export default class MPPT_RX2 extends Model<MPPT_RX2_Type> {
  @Column({
    type: DataType.SMALLINT,
    defaultValue: null,
  })
  mpptNumber: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  mosfetTemp: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  controllerTemp: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
