import { Injectable } from '@nestjs/common'
import { Survey } from './survey'

@Injectable()
export class AppService {
    private survey: Survey = []

    get(): Survey {
        return this.survey
    }

    save(s: Survey): Survey {
        this.survey = s
        return this.survey
    }
}
