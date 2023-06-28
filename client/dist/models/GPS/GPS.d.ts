import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type GPS_Type = InferAttributes<GPS>;
export default class GPS extends Model {
    heading: number;
    latitude: string;
    longitude: string;
    speed: number;
}
