"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countOne = exports.createModuleItem = exports.getAllModuleItem = exports.getAllModule = exports.getAll = exports.telemetryApi = exports.WHEEL_RADIUS_MI = exports.WHEEL_DIAM_MI = exports.WHEEL_DIAM_IN = exports.INCHES_PER_MILE = void 0;
const axios_1 = require("axios");
exports.INCHES_PER_MILE = 63360;
exports.WHEEL_DIAM_IN = 23.071;
exports.WHEEL_DIAM_MI = (exports.WHEEL_DIAM_IN / exports.INCHES_PER_MILE);
exports.WHEEL_RADIUS_MI = exports.WHEEL_DIAM_MI * Math.PI;
exports.telemetryApi = axios_1.default.create({
    baseURL: process.env.REACT_APP_TELEMETRY_API
});
function getAll() {
    return exports.telemetryApi.get("/api/live/data")
        .then((response) => response.data);
}
exports.getAll = getAll;
function getAllModule(module, message, where = null) {
    return exports.telemetryApi.get(`/api/${module}/${String(message)}`, {
        params: Object.assign({}, (where && { where: JSON.stringify(where) }))
    })
        .then((response) => response.data);
}
exports.getAllModule = getAllModule;
function getAllModuleItem(module, message, item, where = null) {
    return exports.telemetryApi.get(`/api/${module}/${String(message)}/item/${String(item)}`, {
        params: Object.assign({}, (where && { where: JSON.stringify(where) }))
    })
        .then((response) => response.data);
}
exports.getAllModuleItem = getAllModuleItem;
function createModuleItem(module, message, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.telemetryApi.post(`/api/${module}/${String(message)}`, data);
    });
}
exports.createModuleItem = createModuleItem;
function countOne(telemetry, where) {
    const [telemetryType, message] = telemetry.split('.');
    return exports.telemetryApi.get(`/api/${telemetryType}/${message}/cnt`, {
        params: Object.assign({}, (where && { where: JSON.stringify(where) }))
    })
        .then((response) => parseInt(response.data));
}
exports.countOne = countOne;
//# sourceMappingURL=telemetry.js.map