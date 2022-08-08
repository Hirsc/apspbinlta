import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { AppService } from './app.service'
import { AddEntry, Entry, Survey, UpdateEntry } from './survey'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getSurvey(): Survey {
        return this.appService.get()
    }
    @Post()
    addEntry(@Body() entry: AddEntry): AddEntry {
        return this.appService.add(entry)
    }
    @Put()
    updateEntry(@Body() entry: UpdateEntry): Entry {
        return this.appService.update(entry)
    }
}
