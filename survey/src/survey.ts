export type Survey = Entry[]
export interface Entry {
    name: string
    weekdays: {
        [key in Weekdays]: boolean
    }
}
export interface UpdateEntry {
    name: string
    weekdays: {
        [key in Weekdays]?: boolean
    }
}
export interface AddEntry {
    name: string
    weekdays: {
        [key in Weekdays]?: boolean
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
