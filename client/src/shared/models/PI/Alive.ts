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

export type Alive_Type = InferAttributes<Alive>;

@Table
export default class Alive extends Model {
  @Index
  @CreatedAt
  createdAt?: Date;
}
