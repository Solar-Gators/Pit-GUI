import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type Mitsuba_RX2_Type = InferAttributes<Mitsuba_RX2>;
export default class Mitsuba_RX2 extends Model<Mitsuba_RX2_Type> {
    adSensorError: boolean;
    motorCurrSensorUError: boolean;
    motorCurrSensorWError: boolean;
    fetThermError: boolean;
    battVoltSensorError: boolean;
    battCurrSensorError: boolean;
    battCurrSensorAdjError: boolean;
    motorCurrSensorAdjError: boolean;
    accelPosError: boolean;
    contVoltSensorError: boolean;
    powerSystemError: boolean;
    overCurrError: boolean;
    overVoltError: boolean;
    overCurrLimit: boolean;
    motorSystemError: boolean;
    motorLock: boolean;
    hallSensorShort: boolean;
    hallSensorOpen: boolean;
    overHeatLevel: number;
}
