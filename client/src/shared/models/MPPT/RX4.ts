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

export type MPPT_RX4_Type = InferAttributes<MPPT_RX4>;

@Table
export default class MPPT_RX4 extends Model<MPPT_RX4_Type> {
  @Column({
    type: DataType.SMALLINT,
    defaultValue: null,
  })
  mpptNumber: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  maxOutputVoltage: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  maxInputCurrent: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
