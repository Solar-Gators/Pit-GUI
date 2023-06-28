import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type MPPT_RX5_Type = InferAttributes<MPPT_RX5>;
export default class MPPT_RX5 extends Model<MPPT_RX5_Type> {
    mpptNumber: number;
    CANRXerr: number;
    CANTXerr: number;
    CANTXoverflow: number;
    error_low_array_power: boolean;
    error_mosfet_overheat: boolean;
    error_battery_low: boolean;
    error_battery_full: boolean;
    error_12v_undervolt: boolean;
    error_hw_overcurrent: boolean;
    error_hw_overvolt: boolean;
    flag_input_current_min: boolean;
    flag_input_current_max: boolean;
    flag_output_voltage_max: boolean;
    flag_mosfet_temp: boolean;
    flag_duty_cycle_min: boolean;
    flag_duty_cycle_max: boolean;
    flag_local_mppt: boolean;
    flag_global_mppt: boolean;
    mode: boolean;
}
