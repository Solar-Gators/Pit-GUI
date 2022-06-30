'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class BMS_RX1 extends Model {
    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    max_pack_dcl_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    max_pack_ccl_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    max_pack_volt_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    min_pack_volt_: number
}
