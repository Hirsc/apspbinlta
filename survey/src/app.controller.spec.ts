import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Survey, Entry, AddEntry, getDefaultWeekdays } from './survey'

describe('Survey', () => {
    let appController: AppController
    let appService: AppService
    describe('Scenario: Saving new Entries', () => {
        beforeEach(async () => {
            const app: TestingModule = await Test.createTestingModule({
                controllers: [AppController],
                providers: [AppService],
            }).compile()

            appController = app.get<AppController>(AppController)
            appService = app.get<AppService>(AppService)
        })

        describe('save', () => {
            it('should return an survey array', async () => {
                const emptyArray: Survey = []
                const result = appController.getSurvey()
                expect(result).toStrictEqual(emptyArray)
            })
        })

        describe('WHEN adding a sruvey', () => {
            it('THEN the added survey should be returned the same' ,async () => {
                const toBeSaved: Entry = {
                    name: 'Kai',
                    weekdays: {
                        ...getDefaultWeekdays(),
                        monday: true,
                    },
                }
                const actual = appController.addEntry(toBeSaved)
                const expected: Entry = {
                    name: 'Kai',
                    weekdays: {
                        ...getDefaultWeekdays(),
                        monday: true,
                    },
                }

                expect(actual).toStrictEqual(expected)
            })
        })
        describe('WHEN updating a sruvey', () => {
            it('THEN the updated survey should be returned the same', async () => {
                const toBeSaved: Entry = {
                    name: 'Kai',
                    weekdays: getDefaultWeekdays(),
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
                        ...getDefaultWeekdays(),
                        monday: true,
                        sunday: true,
                    },
                }

                expect(actual).toStrictEqual(expected)
            })
        })
        describe('WHEN updating a survey', () => {
            it('THEN the updated survey should be returned the same', async () => {
                const toBeSaved: AddEntry = {
                    name: 'Kai',
                    weekdays: {},
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
                        ...getDefaultWeekdays(),
                        monday: true,
                        sunday: true,
                    },
                }

                expect(actual).toStrictEqual(expected)
            })
        })
        describe('WHEN reseting a survey', () => {
            it('THEN survey should be an empty array', async () => {
                appService.reset()
                const actual = appController.getSurvey()
                const expected: Survey = []

                expect(actual).toStrictEqual(expected)
            })
        })
    })
})
