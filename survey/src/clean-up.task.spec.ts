import { Test, TestingModule } from '@nestjs/testing'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Entry, getDefaultWeekdays } from './survey'
import { TasksModule } from './tasks.module'
import { CleanUpTasksService } from './clean-up.task'

describe('Survey', () => {
    let appController: AppController
    let task: CleanUpTasksService
    describe('Scenario: Reseting with cron job', () => {
        beforeEach(async () => {
            const app: TestingModule = await Test.createTestingModule({
                imports: [ScheduleModule.forRoot(), TasksModule],
                controllers: [AppController],
                providers: [AppService],
            }).compile()

            appController = app.get<AppController>(AppController)
            task = app.get<CleanUpTasksService>(CleanUpTasksService)

            const toBeSaved: Entry = {
                name: 'Kai',
                weekdays: {
                    ...getDefaultWeekdays(),
                    monday: true,
                },
            }
            appController.addEntry(toBeSaved)
            const survey = appController.getSurvey()
            expect(survey.length).toStrictEqual(1)
        })

        describe('WHEN triggering cron function manually', () => {
            beforeEach(async () => {
                task.handleCron()
            })

            it('THEN should return an empty survey array', async () => {
                const actual = appController.getSurvey()
                expect(actual.length).toStrictEqual(0)
            })
        })
    })
})
