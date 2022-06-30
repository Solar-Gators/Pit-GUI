'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class BMS_RX0 extends Model {
    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    low_cell_volt_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    high_cell_volt_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    avg_cell_volt_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    pack_sum_volt_: number
}
