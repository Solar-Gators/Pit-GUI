'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class BMS_RX3 extends Model {
    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    low_cell_res_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    high_cell_res_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    pack_res_: number
}
