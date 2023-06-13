import { calculateDistanceTraveled } from "../helper/math"
import sequelize from "../models"
import Mitsuba_RX0, { Mitsuba_RX0_Type } from "../shared/models/Mitsuba/RX0"
import DistanceTraveled from "../shared/models/Stats/DistanceTraveled"

export async function historicalDistanceTraveled() {
    await sequelize.sync({ alter: true })

    // destroy any existing distance traveled
    await DistanceTraveled.destroy({ truncate: true })

    const allData = await Mitsuba_RX0.findAll({
        order: [['createdAt', 'asc']],
        attributes: ["createdAt", "motorRPM"]
    })

    let previousValue: Mitsuba_RX0_Type = null

    for (let i = 0; i < allData.length; i++) {
        const data = allData[i]
        if (previousValue) {
            await calculateDistanceTraveled(
                previousValue,
                data
            )
        }

        previousValue = data
    }

}


// if script is called directly
if (require.main === module) {
    historicalDistanceTraveled()
}
