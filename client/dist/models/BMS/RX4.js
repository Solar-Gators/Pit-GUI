'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let BMS_RX4 = class BMS_RX4 extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "internal_cell_communication_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "cell_balancing_stuck_off_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "weak_cell_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "low_cell_voltage_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "cell_open_wiring_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "current_sensor_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "cell_voltage_over_5v_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "cell_bank_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "weak_pack_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "fan_monitor_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "thermistor_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "can_communication_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "redundant_power_supply_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "high_voltage_isolation_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "invalid_input_supply_voltage_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "chargeenable_relay_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "dischargeenable_relay_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "charger_safety_relay_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "internal_hardware_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "internal_heatsink_thermistor_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "internal_logic_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "highest_cell_voltage_too_high_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "lowest_cell_voltage_too_low_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: null
    })
], BMS_RX4.prototype, "pack_too_hot_fault_", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: null
    })
], BMS_RX4.prototype, "pack_soc_", void 0);
BMS_RX4 = __decorate([
    sequelize_typescript_1.Table
], BMS_RX4);
exports.default = BMS_RX4;
//# sourceMappingURL=RX4.js.map