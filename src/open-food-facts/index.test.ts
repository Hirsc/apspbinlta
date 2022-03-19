import { OpenFoodFactsService } from "."

const ean = "4001954165018"

describe.skip(`GIVEN I have an EAN Key`, () => {

    describe(`WHEN I get product for the EAN`, () => {
        let info: any

        beforeAll(async () => {
            const foodInformationService = new OpenFoodFactsService()
            const [foodInformation, error] = await foodInformationService.get(ean)
            info = foodInformation
        })

        it(`THEN I receive the name of the prodcut`, async () => {

            expect(info).toHaveProperty("name")
        })
    })

})
