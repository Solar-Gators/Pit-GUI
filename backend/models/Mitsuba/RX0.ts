'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class Mitsuba_RX0 extends Model {
  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  battVoltage: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  battCurrent: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  motorCurrentPkAvg: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  FETtemp: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  motorRPM: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  PWMDuty: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: null
  })
  LeadAngle: number
}
