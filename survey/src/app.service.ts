import { Injectable } from '@nestjs/common'
import { AddEntry, Entry, getDefaultWeekdays, Survey, UpdateEntry } from './survey'
import { Repository } from './repository'

let survey: Survey = []

@Injectable()
export class AppService implements Repository<Entry> {
    get(): Survey {
        return survey
    }
    reset(): Survey {
        survey = []
        return survey
    }
    findOccurence(name: string): Entry {
        const found = survey.find((o) => o.name === name)

        return found
    }
    add(entry: AddEntry): Entry {
        const newEntry = {
            ...entry,
            weekdays: {
                ...getDefaultWeekdays(),
                ...entry?.weekdays,
            },
        }
        survey.push(newEntry)

        return newEntry
    }
    update(entry: UpdateEntry): Entry {
        const currIndex = survey.findIndex((o) => o.name === entry.name)
        const temp = [...survey]

        const newEntry = {
            ...temp[currIndex],
            ...entry,
            weekdays: {
                ...getDefaultWeekdays(),
                ...temp[currIndex]?.weekdays,
                ...entry?.weekdays,
            },
        }

        survey[currIndex] = newEntry

        return newEntry
    }
}
