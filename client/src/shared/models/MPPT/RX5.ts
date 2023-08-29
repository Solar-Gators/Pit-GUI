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

export type MPPT_RX5_Type = InferAttributes<MPPT_RX5>;

@Table
export default class MPPT_RX5 extends Model<MPPT_RX5_Type> {
  @Column({
    type: DataType.SMALLINT,
    defaultValue: null,
  })
  mpptNumber: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  CANRXerr: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  CANTXerr: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  CANTXoverflow: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_low_array_power: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_mosfet_overheat: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_battery_low: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_battery_full: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_12v_undervolt: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_hw_overcurrent: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  error_hw_overvolt: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_input_current_min: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_input_current_max: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_output_voltage_max: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_mosfet_temp: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_duty_cycle_min: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_duty_cycle_max: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_local_mppt: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  flag_global_mppt: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  mode: boolean;

  @Index
  @CreatedAt
  createdAt?: Date;
}
