import axios from "axios";
import { BMS_RX0_Type } from "../models/BMS/RX0"
import { BMS_RX1_Type } from "../models/BMS/RX1"
import { BMS_RX2_Type } from "../models/BMS/RX2"
import { BMS_RX3_Type } from "../models/BMS/RX3"
import { BMS_RX4_Type } from "../models/BMS/RX4"
import { BMS_RX5_Type } from "../models/BMS/RX5"
import { GPS_Type } from "../models/GPS/GPS";
import { Mitsuba_RX0_Type } from "../models/Mitsuba/RX0"
import { Mitsuba_RX1_Type } from "../models/Mitsuba/RX1"
import { Mitsuba_RX2_Type } from "../models/Mitsuba/RX2"
import { MPPT_RX0_Type } from "../models/MPPT/RX0"
import { MPPT_RX1_Type } from "../models/MPPT/RX1"
import { MPPT_RX2_Type } from "../models/MPPT/RX2"
import { MPPT_RX3_Type } from "../models/MPPT/RX3"
import { MPPT_RX4_Type } from "../models/MPPT/RX4"
import { MPPT_RX5_Type } from "../models/MPPT/RX5"
import { DistanceTraveled_Type } from "../models/Stats/DistanceTraveled";
import { LapCount_Type } from "../models/Stats/LapCount";


export const INCHES_PER_MILE = 63360
/**
 * Diameter of the car's wheel in inches
 */
export const WHEEL_DIAM_IN = 23.071;
/**
 * Diameter of the car's wheel in miles
 */
export const WHEEL_DIAM_MI = (WHEEL_DIAM_IN / INCHES_PER_MILE);
/**
 * Radius of the car's wheel in miles
 */
export const WHEEL_RADIUS_MI = WHEEL_DIAM_MI * Math.PI;

export type MPPT_Group = {
    rx0: MPPT_RX0_Type
    rx1: MPPT_RX1_Type
    rx2: MPPT_RX2_Type
    rx3: MPPT_RX3_Type
    rx4: MPPT_RX4_Type
    rx5: MPPT_RX5_Type
}

export interface CanData {
    bms: {
        rx0: BMS_RX0_Type
        rx1: BMS_RX1_Type
        rx2: BMS_RX2_Type
        rx3: BMS_RX3_Type
        rx4: BMS_RX4_Type
        rx5: BMS_RX5_Type
    }
    mitsuba: {
        rx0: Mitsuba_RX0_Type
        rx1: Mitsuba_RX1_Type
        rx2: Mitsuba_RX2_Type
        distance_traveled: DistanceTraveled_Type
    },
    mppt: {
        "1": MPPT_Group,
        "2": MPPT_Group,
        "3": MPPT_Group
    }
}

export interface DataResponse extends CanData {
    gps: GPS_Type,
    laps: {
        rx0: LapCount_Type
    }
}

export const telemetryApi = axios.create({
    baseURL: process.env.REACT_APP_TELEMETRY_API
});

export function getAll(): Promise<DataResponse> {
    return telemetryApi.get("/api/live/data")
    .then((response) => response.data)
}

export function getAllModule<T extends keyof CanData, P extends keyof CanData[T]>(module: T, message: P, where: Record<string, any> = null): Promise<CanData[T][P][]> {
    return telemetryApi.get(`/api/${module}/${String(message)}`, {
        params: {
            ...(where && { where: JSON.stringify(where) })
        }
    })
    .then((response) => response.data) as any
}

export function getAllModuleItem<T extends keyof CanData, P extends keyof CanData[T], Q extends keyof CanData[T][P]>(module: T, message: P, item: Q, where: Record<string, any> = null): Promise<CanData[T][P][]> {
    return telemetryApi.get(`/api/${module}/${String(message)}/item/${String(item)}`, {
        params: {
            ...(where && { where: JSON.stringify(where) })
        }
    })
    .then((response) => response.data) as any
}

type addPrefixToObject<T, P extends string> = {
    [K in keyof T as K extends string ? `${P}${K}` : never]: T[K]
}

type bmsModels = keyof addPrefixToObject<DataResponse['bms'], 'bms.'>
type mitsubaModels = keyof addPrefixToObject<DataResponse['mitsuba'], 'mitsuba.'>

type telemetryModels = bmsModels | mitsubaModels

export async function getMostRecent<T extends keyof CanData, P extends keyof CanData[T]>(module: T, message: P) {
    return telemetryApi.get(`/api/${module}/${String(message)}`, {
        params: {
            limit: 1,
            order: JSON.stringify([[
                'createdAt',
                'DESC'
            ]])
        }
    }).then((r) => r.data[0])
}


export async function createModuleItem<T extends keyof CanData, P extends keyof CanData[T]>(module: T, message: P, data: CanData[T][P]) {
    await telemetryApi.post(`/api/${module}/${String(message)}`, data)
}


export function countOne(telemetry: telemetryModels, where?: Record<string, any>): Promise<number> {
    const [telemetryType, message] = telemetry.split('.')
    return telemetryApi.get(`/api/${telemetryType}/${message}/cnt`, {
        params: {
            ...(where && { where: JSON.stringify(where) })
        }
    })
    .then((response) => parseInt(response.data))
}

export function countLaps() {
    return telemetryApi.post("/api/count-lap")
}
