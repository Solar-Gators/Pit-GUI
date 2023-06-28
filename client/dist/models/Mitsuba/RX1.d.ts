import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type Mitsuba_RX1_Type = InferAttributes<Mitsuba_RX1>;
export default class Mitsuba_RX1 extends Model<Mitsuba_RX1_Type> {
    powerMode: boolean;
    MCmode: boolean;
    acceleratorPosition: number;
    regenVRposition: number;
    digitSWposition: number;
    outTargetVal: number;
    driveActStat: number;
    regenStat: boolean;
}
