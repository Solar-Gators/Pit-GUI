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

export type BMS_RX4_Type = InferAttributes<BMS_RX4>;

@Table
export default class BMS_RX4 extends Model<BMS_RX4_Type> {
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  internal_cell_communication_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  cell_balancing_stuck_off_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  weak_cell_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  low_cell_voltage_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  cell_open_wiring_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  current_sensor_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  cell_voltage_over_5v_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  cell_bank_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  weak_pack_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  fan_monitor_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  thermistor_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  can_communication_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  redundant_power_supply_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  high_voltage_isolation_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  invalid_input_supply_voltage_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  chargeenable_relay_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  dischargeenable_relay_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  charger_safety_relay_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  internal_hardware_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  internal_heatsink_thermistor_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  internal_logic_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  highest_cell_voltage_too_high_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  lowest_cell_voltage_too_low_fault_: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: null,
  })
  pack_too_hot_fault_: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
  })
  pack_soc_: number;

  @Index
  @CreatedAt
  createdAt?: Date;
}
