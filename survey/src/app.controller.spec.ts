import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Survey } from './survey'

describe('Survey', () => {
    let appController: AppController
    describe('Scenario: Saving new Entries', () => {
        beforeEach(async () => {
            const app: TestingModule = await Test.createTestingModule({
                controllers: [AppController],
                providers: [AppService],
            }).compile()

            appController = app.get<AppController>(AppController)
        })

        describe('save', () => {
            it('should return an survey array', () => {
                const emptyArray: Survey = []
                const result = appController.getSurvey()
                expect(result).toStrictEqual(emptyArray)
            })
        })
        // describe('saving weekdays with wrong length throws error', () => {
        //     it('should return an survey array', () => {
        //         const toBeSaved: Survey = [
        //             {
        //                 name: 'Kai',
        //                 weekdays: [true, false],
        //             },
        //         ]
        //         expect(appController.saveSurvey(toBeSaved)).toBe('error')
        //     })
        // })
        describe('WHEN saving a sruvey', () => {
            it('THEN the saved survey should be returned the same', () => {
                const expectedDaysToBeSet = 5
                const toBeSaved: Survey = [
                    {
                        name: 'Kai',
                        weekdays: buildWeekdays(expectedDaysToBeSet),
                    },
                ]
                appController.saveSurvey(toBeSaved)
                const result = appController.getSurvey()
                console.log(result)
                const actualWeekdays = result[0].weekdays
                const amountOfSetDays = actualWeekdays.filter((w) => w === true).length
                expect(amountOfSetDays).toBe(5)
            })
        })
    })
})

function buildWeekdays(personIsAvailableAmount: number): boolean[] {
    const result = []
    for (let i = 0; i < 7; i++) {
        if (result.filter((r) => r === true).length < personIsAvailableAmount) {
            result.push(true)
        }
    }

    return result
}
