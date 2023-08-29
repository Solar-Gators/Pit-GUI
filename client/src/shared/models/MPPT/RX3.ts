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

export type MPPT_RX3_Type = InferAttributes<MPPT_RX3>;

@Table
export default class MPPT_RX3 extends Model<MPPT_RX3_Type> {
  @Column({
    type: DataType.SMALLINT,
    defaultValue: null,
  })
  mpptNumber: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  aux12V: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  aux3V: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
