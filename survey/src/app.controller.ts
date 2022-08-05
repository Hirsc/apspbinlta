import { Controller, Get, Patch, Post, Put } from '@nestjs/common'
import { AppService } from './app.service'
import { Entry, Survey } from './survey'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getSurvey(): Survey {
        return this.appService.get()
    }
    @Post()
    addEntry(entry: Entry): Entry {
        return this.appService.addEntry(entry)
    }
    @Put()
    updateEntry(entry: Entry): Entry {
        return this.appService.updateEntry(entry)
    }
}
