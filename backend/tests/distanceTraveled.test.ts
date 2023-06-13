import { expect } from "chai"
import { WHEEL_RADIUS_MI, countOne, createModuleItem, getAll } from "../shared/sdk/telemetry"
import Mitsuba_RX0 from "../shared/models/Mitsuba/RX0"
import DistanceTraveled from "../shared/models/Stats/DistanceTraveled"
import { historicalDistanceTraveled } from "../scripts/historicalDistanceTraveled"


describe("Test Distance Traveled Calculation When New Data Comes In", () => {
    beforeEach(async () => {
        //clear db
        await Mitsuba_RX0.destroy({ truncate: true })
        await DistanceTraveled.destroy({ truncate: true })
    })

    it("should not calculate distance on the first query" , async () => {
        // Preconditions:
        // - no distance traveled values before the test
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
        // - no mitsuba rx0 messages
        expect(await countOne("mitsuba.rx0")).to.be.eql(0)

        // Test:
        // create rx0 with rpm value
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12
        })


        // Assertion:
        // - no distance traveled recorded
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
    })


    it("should calculate distance traveled after the first value" , async () => {
        // Preconditions:
        // - no distance traveled values before the test
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
        // - no mitsuba rx0 messages
        expect(await countOne("mitsuba.rx0")).to.be.eql(0)

        // Test:
        // create first rx0 with rpm value
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:00"
        })
        // create second message 1 second later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:01"
        })

        // Assertion:
        // - distance traveled recorded
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(1)
        const data = await getAll()
        // - rpm was constant so it should be 12 rpm for 1 second which is 12/60 rotations
        expect(data.mitsuba.distance_traveled.distance).to.be.eql(
            (12/60)*WHEEL_RADIUS_MI
        )
    })

    it("should calculate distance traveled based on previous value" , async () => {
        // Preconditions:
        // - no distance traveled values before the test
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
        // - no mitsuba rx0 messages
        expect(await countOne("mitsuba.rx0")).to.be.eql(0)

        // Test:
        // create first rx0 with rpm value
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:00"
        })
        // create second message 1 second later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:01"
        })
        // create third message 1 second later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:02"
        })

        // Assertion:
        // - distance traveled recorded
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(1)
        const data = await getAll()
        // - rpm was constant so it should be 12 rpm for 2 seconds is 12 / 30
        expect(data.mitsuba.distance_traveled.distance).to.be.eql(
            (12/30)*WHEEL_RADIUS_MI
        )
    })

    it("should not calculate if the car has been off for an extended period of time" , async () => {
        // Preconditions:
        // - no distance traveled values before the test
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
        // - no mitsuba rx0 messages
        expect(await countOne("mitsuba.rx0")).to.be.eql(0)

        // Test:
        // create first rx0 with rpm value
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:00"
        })
        // create second message 10 minutes later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:10:00"
        })


        // Assertion:
        // - no distance traveled recorded
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
    })

})

describe("Test Distance Traveled Calculation On Historical Data", () => {
    beforeEach(async () => {
        //clear db
        await Mitsuba_RX0.destroy({ truncate: true })
        await DistanceTraveled.destroy({ truncate: true })
    })

    it("Should calculate historical distance correctly", async () => {
        // Preconditions:
        // - no distance traveled values before the test
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(0)
        // - no mitsuba rx0 messages
        expect(await countOne("mitsuba.rx0")).to.be.eql(0)

        // Test:

        /* (12/60)*2 rotations */
        // create first rx0 with rpm value
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:00"
        })
        // create second message 1 second later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:01"
        })
        // create third message 1 second later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 10:00:02"
        })

        /* (12/60) rotations */
        // create forth message 1 hour later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 11:00:00"
        })
        // create forth message 1 second later
        await createModuleItem("mitsuba", "rx0", {
            motorRPM: 12,
            createdAt: "07/01/2022 11:00:01"
        })

        // run historical method
        await historicalDistanceTraveled()

        // Assertion:
        // - distance traveled recorded
        expect(await countOne("mitsuba.distance_traveled")).to.be.eql(1)
        const data = await getAll()
        // - rpm was constant so it should be (12/60)*3 or 12/20
        expect(data.mitsuba.distance_traveled.distance).to.be.eql(
            (12/20)*WHEEL_RADIUS_MI
        )
    })
})
