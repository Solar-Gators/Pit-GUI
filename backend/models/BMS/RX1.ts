'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class BMS_RX1 extends Model {
    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    high_temp_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    high_temp_id_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    low_temp_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    low_temp_id_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    avg_temp_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    internal_temp_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    constant_val_: number

}
