
'use strict';
import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class BMS_RX2 extends Model {
    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    pack_dcl_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    pack_ccl_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    pack_current_: number

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    constant_val_: number

}
