// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const VoltageSchema = new Schema(
  {
    LowCellVoltage : Number,
    highCellVoltage : Number,
    avgCellVoltage : Number,
    packSumVoltage : Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Voltage", VoltageSchema);
