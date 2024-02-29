'use strict';
import { InferAttributes } from "sequelize"
import { Table, Column, Model, DataType, Index, CreatedAt } from 'sequelize-typescript'

export type PowerConsumption_Type = InferAttributes<PowerConsumption>

@Table
export default class PowerConsumption extends Model {
  @Column({
    type: DataType.DOUBLE
  })
  power: number

  @Index
  @CreatedAt
  createdAt?: Date
}
