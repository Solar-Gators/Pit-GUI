const commonConfig = {
  "username": "solargators",
  "host": "mysql",
  "logging": false,
  "dialect": "mysql"
}


const config = {
  "development": {
    "password": "password",
    "database": "SolarGators_Telemetry_Dev",
    ...commonConfig
  },
  "production": {
    "username": "solargators",
    "database": "SolarGators_Telemetry_Prod",
    ...commonConfig
  }
}
export = config;
