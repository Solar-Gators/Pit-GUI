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

export type LapCount_Type = InferAttributes<LapCount>;

@Table
export default class LapCount extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  lap: number;
  @Index
  @CreatedAt
  createdAt?: Date;
}
