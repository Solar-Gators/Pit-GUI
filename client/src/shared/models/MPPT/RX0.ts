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

export type MPPT_RX0_Type = InferAttributes<MPPT_RX0>;

@Table
export default class MPPT_RX0 extends Model<MPPT_RX0_Type> {
  @Column({
    type: DataType.SMALLINT,
    defaultValue: null,
  })
  mpptNumber: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  inputVoltage: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  inputCurrent: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
