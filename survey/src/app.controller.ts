import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common'
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
    addEntry(@Body() entry: AddEntry): Entry {
        return this.appService.addEntry(entry)
    }
    @Put()
    updateEntry(@Body() entry: UpdateEntry): Entry {
        return this.appService.updateEntry(entry)
    }
}
