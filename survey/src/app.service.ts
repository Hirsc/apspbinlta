import { Injectable } from '@nestjs/common'
import { Entry, Survey } from './survey'

@Injectable()
export class AppService {
    private survey: Survey = []

    get(): Survey {
        return this.survey
    }

    addEntry(entry: Entry): Entry {
        this.survey.push(entry)

        return entry
    }
    updateEntry(entry: Entry): Entry {
        const currIndex = this.survey.findIndex((o) => o.name === entry.name)
        const temp = [...this.survey]

        temp[currIndex] = {
            ...temp[currIndex],
            ...entry,
        }
        this.survey = temp

        return entry
    }
}
