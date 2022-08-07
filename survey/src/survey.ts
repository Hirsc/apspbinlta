import { IsNotEmpty, IsOptional, Validate } from 'class-validator'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { AppService } from './app.service'

function IsUnique(validationOptions?: ValidationOptions) {
    return function (object: Entry | AddEntry | UpdateEntry, propertyName: string) {
        registerDecorator({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: string, args: ValidationArguments) {
                    const found = new AppService().findOccurence(value)

                    return found === undefined
                },
                defaultMessage(args: ValidationArguments) {
                    return 'Name is already in use'
                },
            },
        })
    }
}
export type Survey = Entry[]

type EntryWeekdays = {
    [key in Weekdays]: boolean
}
type OptionalEntryWeekdays = {
    [key in Weekdays]?: boolean
}

export class Entry {
    @IsNotEmpty()
    @IsUnique()
    public name: string

    @IsNotEmpty()
    public weekdays: EntryWeekdays

    constructor(name: string, weekdays: EntryWeekdays) {
        this.name = name
        this.weekdays = weekdays
    }
}
export class AddEntry {
    @IsNotEmpty()
    @IsUnique()
    public name: string

    @IsOptional()
    public weekdays: OptionalEntryWeekdays

    constructor(name: string, weekdays: OptionalEntryWeekdays) {
        this.name = name
        this.weekdays = weekdays
    }
}
export class UpdateEntry {
    @IsNotEmpty()
    @IsUnique()
    public name: string

    @IsOptional()
    public weekdays: OptionalEntryWeekdays

    constructor(name: string, weekdays: OptionalEntryWeekdays) {
        this.name = name
        this.weekdays = weekdays
    }
}

export enum Weekdays {
    'monday' = 'monday',
    'tuesday' = 'tuesday',
    'wedneyday' = 'wedneyday',
    'thursday' = 'thursday',
    'friday' = 'friday',
    'saturday' = 'saturday',
    'sunday' = 'sunday',
}

export function getDefaultWeekdays(): { [key in Weekdays]: boolean } {
    return {
        monday: false,
        tuesday: false,
        wedneyday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    }
}
