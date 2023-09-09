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

export type MPPT_RX1_Type = InferAttributes<MPPT_RX1>;

@Table
export default class MPPT_RX1 extends Model<MPPT_RX1_Type> {
  @Column({
    type: DataType.SMALLINT,
    defaultValue: null,
  })
  mpptNumber: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  outputVoltage: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  outputCurrent: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
