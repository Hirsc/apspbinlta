import { Entry } from './survey'
import { getTotalParticipientsByColumns, Total } from './transform-rows-to-columns'


describe('Unit: getTotalParticipientsByColumns', () => {
    describe('GIVEN an empty array of participients' ,() => {
        const input = [{} as Entry]
        let actual: Total
        describe('WHEN finding out the total participients of the weekdays', () => {
            beforeEach(() => {   
                actual = getTotalParticipientsByColumns(input)
            })
            it('THEN the totals should be all zeros', () => {
                const expected = {monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0}
                expect(actual).toStrictEqual(expected)
            })
        })
    })
})