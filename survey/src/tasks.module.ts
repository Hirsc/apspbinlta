import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { CleanUpTasksService } from './clean-up.task'

@Module({
    imports: [],
    providers: [AppService, CleanUpTasksService],
})
export class TasksModule {}
