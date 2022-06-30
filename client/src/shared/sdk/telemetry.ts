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


export interface DataResponse {
    gps: GPS_Type | null
    bms: {
        rx0: BMS_RX0_Type | null
        rx1: BMS_RX1_Type | null
        rx2: BMS_RX2_Type | null
        rx3: BMS_RX3_Type | null
        rx4: BMS_RX4_Type | null
        rx5: BMS_RX5_Type | null
    }
    mitsuba: {
        rx0: Mitsuba_RX0_Type | null
        rx1: Mitsuba_RX1_Type | null
        rx2: Mitsuba_RX2_Type | null
    }
}

export function getAll(): Promise<DataResponse> {
    return axios.get("/api/live/data")
    .then((response) => response.data)
}
