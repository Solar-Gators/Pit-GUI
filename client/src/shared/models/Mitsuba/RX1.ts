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

export type Mitsuba_RX1_Type = InferAttributes<Mitsuba_RX1>;

@Table
export default class Mitsuba_RX1 extends Model<Mitsuba_RX1_Type> {
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  powerMode: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  MCmode: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  acceleratorPosition: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  regenVRposition: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  digitSWposition: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  outTargetVal: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  driveActStat: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  regenStat: boolean;

  @Index
  @CreatedAt
  createdAt?: Date;
}
