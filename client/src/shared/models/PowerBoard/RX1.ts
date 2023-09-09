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

export type PowerBoard_RX0_Type = InferAttributes<PowerBoard_RX1>;

@Table
export default class PowerBoard_RX1 extends Model<PowerBoard_RX0_Type> {
  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  SupBatVoltage_: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  SupBatPower_: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: null,
  })
  MainBatPower_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
