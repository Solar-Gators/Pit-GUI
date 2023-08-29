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

export type DistanceTraveled_Type = InferAttributes<DistanceTraveled>;

@Table
export default class DistanceTraveled extends Model {
  @Column({
    type: DataType.DOUBLE,
  })
  distance: number;
  @Index
  @CreatedAt
  createdAt?: Date;
}
