import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Survey, Entry } from './survey'

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
        describe('WHEN adding a sruvey', () => {
            it('THEN the added survey should be returned the same', () => {
                const toBeSaved: Entry = {
                    name: 'Kai',
                    weekdays: {
                        monday: true,
                        tuesday: false,
                        wedneyday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: false,
                    },
                }
                const actual = appController.addEntry(toBeSaved)
                const expected: Entry = {
                    name: 'Kai',
                    weekdays: {
                        monday: true,
                        tuesday: false,
                        wedneyday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: false,
                    },
                }

                expect(actual).toStrictEqual(expected)
            })
        })
        describe('WHEN updating a sruvey', () => {
            it('THEN the updated survey should be returned the same', () => {
                const toBeSaved: Entry = {
                    name: 'Kai',
                    weekdays: {
                        monday: false,
                        tuesday: false,
                        wedneyday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: false,
                    },
                }
                appController.addEntry(toBeSaved)
                const actual = appController.updateEntry({
                    ...toBeSaved,
                    weekdays: {
                        ...toBeSaved.weekdays,
                        monday: true,
                        sunday: true,
                    },
                })
                const expected: Entry = {
                    name: 'Kai',
                    weekdays: {
                        monday: true,
                        tuesday: false,
                        wedneyday: false,
                        thursday: false,
                        friday: false,
                        saturday: false,
                        sunday: true,
                    },
                }

                expect(actual).toStrictEqual(expected)
            })
        })
    })
})
