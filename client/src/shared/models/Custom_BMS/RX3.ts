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

export type BMS_RX3_Type = InferAttributes<BMS_RX3>;

@Table
export default class BMS_RX3 extends Model<BMS_RX3_Type> {
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  low_cell_voltage_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  high_cell_voltage_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  high_charge_current_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  high_discharge_current_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  high_temp_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  thermistor_disconnected_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  current_sensor_disconnect_fault: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  kill_switch_pressed_fault: boolean;

  @Index
  @CreatedAt
  createdAt?: Date;
}
