import { expect } from "chai"
import { countOne, createModuleItem, getAll } from "../shared/sdk/telemetry"
import BMS_RX0 from "../shared/models/BMS/RX0"
import BMS_RX2 from "../shared/models/BMS/RX2"
import PowerConsumption from "../shared/models/Stats/PowerConsumption"

describe("Test Power Consumption Calculation When New Data Comes In", () => {
    beforeEach(async () => {
        //clear db
        await BMS_RX0.destroy({ truncate: true })
        await BMS_RX2.destroy({ truncate: true })
        await PowerConsumption.destroy({ truncate: true })
    })

    it("should not calculate distance on the first query" , async () => {
        // Preconditions:
        // - no power consumption values before the test
        expect(await countOne("bms.power_consumption")).to.be.eql(0)

        // - no bms rx0/rx2 messages
        expect(await countOne("bms.rx0")).to.be.eql(0)
        expect(await countOne("bms.rx2")).to.be.eql(0)

        // Test:
        // create rx0 with pack sum value
        await createModuleItem("bms", "rx0", {
            pack_sum_volt_: 10
        })
        // create rx2 with current
        await createModuleItem("bms", "rx2", {
            pack_current_: 10
        })

        // Assertion:
        // - no power consumption recorded
        expect(await countOne("bms.power_consumption")).to.be.eql(0)
    })

    it("should calculate distance traveled after the first value" , async () => {
        // Preconditions:
        // - no power consumption values before the test
        expect(await countOne("bms.power_consumption")).to.be.eql(0)

        // - no bms rx0/rx2 messages
        expect(await countOne("bms.rx0")).to.be.eql(0)
        expect(await countOne("bms.rx2")).to.be.eql(0)

        // Test:
        // create rx0 with pack sum value
        await createModuleItem("bms", "rx0", {
            pack_sum_volt_: 10,
            createdAt: new Date("07/01/2022 10:00:00")
        })
        // create rx2 with current
        await createModuleItem("bms", "rx2", {
            pack_current_: 10,
            createdAt: new Date("07/01/2022 10:00:00")
        })
        await createModuleItem("bms", "rx0", {
            pack_sum_volt_: 10,
            createdAt: new Date("07/01/2022 10:00:01")
        })
        await createModuleItem("bms", "rx2", {
            pack_current_: 10,
            createdAt: new Date("07/01/2022 10:00:01")
        })


        // Assertion:
        // - power consumption recorded
        expect(await countOne("bms.power_consumption")).to.be.eql(1)
        const data = await getAll()
        // - consumption should be 100wh for 1 second
        expect(data.bms.power_consumption.power).to.be.eql(
            100 / (60*60)
        )
    })


    it("just fill data" , async function() {
        this.timeout(1000000000000000);

        const promises = []

        for (let i = 0; i <= 60*60; i++) {
            const min = i % 60
            const hour = Math.floor(i / 60)
            console.log(new Date(`07/01/2022 10:${hour}:${min}`))
            await createModuleItem("bms", "rx0", {
                pack_sum_volt_: 10,
                createdAt: new Date(`07/01/2022 10:${hour}:${min}`)
            })
            // create rx2 with current
            await createModuleItem("bms", "rx2", {
                pack_current_: 10,
                createdAt: new Date(`07/01/2022 10:${hour}:${min}`)
            })
        }

        await Promise.all(promises)
    })

})
