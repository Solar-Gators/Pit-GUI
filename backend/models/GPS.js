// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const GPSSchema = new Schema(
  {
    heading : Number,
    coordinates : {
        latitude : String,
        longitude : String
      },
    speed : Number
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("GPS", GPSSchema);
