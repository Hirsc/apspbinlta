import { Injectable } from '@nestjs/common'
import { AddEntry, Entry, getDefaultWeekdays, Survey, UpdateEntry } from './survey'

@Injectable()
export class AppService {
    private survey: Survey = []

    get(): Survey {
        return this.survey
    }
    addEntry(entry: AddEntry): Entry {
        const newEntry = {
            ...entry,
            weekdays: {
                ...getDefaultWeekdays(),
                ...entry.weekdays,
            },
        }
        this.survey.push(newEntry)

        return newEntry
    }
    updateEntry(entry: UpdateEntry): Entry {
        const currIndex = this.survey.findIndex((o) => o.name === entry.name)
        const temp = [...this.survey]

        const newEntry = {
            ...temp[currIndex],
            ...entry,
            weekdays: {
                ...getDefaultWeekdays(),
                ...temp[currIndex].weekdays,
                ...entry.weekdays,
            },
        }

        this.survey[currIndex] = newEntry

        return newEntry
    }
}
