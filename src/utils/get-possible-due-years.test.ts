import { getPossibleDueYears } from "./get-possible-due-years"

describe("getPossibleDueYears", () => {
    it("gives current year - 3 and + 10 years", async () => {
        const currentYear = new Date().getFullYear()

        const years = getPossibleDueYears()
        expect(years).toContain(currentYear)
        expect(years).toContain(currentYear + 10)
        expect(years).toContain(currentYear - 3)
    })

})
