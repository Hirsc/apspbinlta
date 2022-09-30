import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { AppService } from './app.service'

const cleanUpCronTiming = process.env.CLEAN_UP_CRON_TIMING || '5 * * * * *'

@Injectable()
export class CleanUpTasksService {
    private readonly logger = new Logger(CleanUpTasksService.name)

    constructor(private readonly appService: AppService) {
        this.logger.log(`Configured CRON timing ${cleanUpCronTiming}`)
    }

    @Cron(cleanUpCronTiming)
    handleCron() {
        this.logger.debug('Reset Cron Triggered')
        this.appService.reset()
    }
}
