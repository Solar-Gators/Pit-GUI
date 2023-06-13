import sequelize from "../models"

before(async () => {
    await sequelize.sync({ alter: true })
})
