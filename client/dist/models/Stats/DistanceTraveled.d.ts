import { InferAttributes } from "sequelize";
import { Model } from 'sequelize-typescript';
export type DistanceTraveled_Type = InferAttributes<DistanceTraveled>;
export default class DistanceTraveled extends Model {
    distance: number;
}
