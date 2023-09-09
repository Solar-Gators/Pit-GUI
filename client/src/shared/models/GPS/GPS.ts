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

export type GPS_Type = InferAttributes<GPS>;

@Table
export default class GPS extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  heading: number;

  @Column({
    type: DataType.STRING(255),
  })
  latitude: string;

  @Column({
    type: DataType.STRING(255),
  })
  longitude: string;

  @Column({
    type: DataType.INTEGER,
  })
  speed: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
