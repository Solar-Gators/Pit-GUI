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

export type Mitsuba_RX0_Type = InferAttributes<Mitsuba_RX0>;

@Table
export default class Mitsuba_RX0 extends Model<Mitsuba_RX0_Type> {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  battVoltage?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  battCurrent?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  motorCurrentPkAvg?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  FETtemp?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  motorRPM?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  PWMDuty?: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  LeadAngle?: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
