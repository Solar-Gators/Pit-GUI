const commonConfig = {
  "username": process.env["DATABASE_USER"] || "solargators",
  "password": process.env["DATABASE_PASSWORD"] || null,
  "host": process.env["DATABASE_HOST"] || "localhost",
  "logging": false,
  "dialect": "mysql"
}


const config = {
  "development": {
    "database": "SolarGators_Telemetry_Dev",
    ...commonConfig
  },
  "production": {
    "database": "SolarGators_Telemetry_Prod",
    ...commonConfig
  }
}
export = config;
