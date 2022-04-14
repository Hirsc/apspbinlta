import { Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { Survey } from './survey'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getSurvey(): Survey {
        return this.appService.get()
    }
    @Post()
    saveSurvey(s: Survey): Survey {
        return this.appService.save(s)
    }
}
