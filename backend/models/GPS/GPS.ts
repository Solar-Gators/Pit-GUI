'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class GPS extends Model {
  @Column({
    type: DataType.NUMBER
  })
  heading: number

  @Column({
    type: DataType.STRING(255)
  })
  latitude: string

  @Column({
    type: DataType.STRING(255)
  })
  longitude: string

  @Column({
    type: DataType.NUMBER
  })
  speed: number
}
