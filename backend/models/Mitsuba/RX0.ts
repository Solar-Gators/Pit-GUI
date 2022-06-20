'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class Mitsuba_RX0 extends Model {
  @Column({
    type: DataType.FLOAT,
    defaultValue: null
  })
  battVoltage: number
  
  @Column({
    type: DataType.FLOAT,
    defaultValue: null
  })
  battCurrent: number

  @Column({
    type: DataType.FLOAT,
    defaultValue: null
  })
  motorCurrentPkAvg: number

  @Column({
    type: DataType.FLOAT,
    defaultValue: null
  })
  FETtemp: number

  @Column({
    type: DataType.NUMBER,
    defaultValue: null
  })
  motorRPM: number

  @Column({
    type: DataType.NUMBER,
    defaultValue: null
  })
  PWMDuty: number

  @Column({
    type: DataType.NUMBER,
    defaultValue: null
  })
  LeadAngle: number
}
