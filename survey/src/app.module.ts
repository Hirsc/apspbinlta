import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksModule } from './tasks.module'

@Module({
    imports: [ScheduleModule.forRoot(), TasksModule],
    exports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
