export type Survey = Entry[]
type EntryWeekdays = {
    [key in Weekdays]: boolean
}

export interface Entry {
    name: string
    weekdays: EntryWeekdays
}

export type AddEntry = Omit<Entry, 'id'>
export interface UpdateEntry {
    name: string
    weekdays: {
        [key in Weekdays]?: boolean
    }
}

export enum Weekdays {
    'monday' = 'monday',
    'tuesday' = 'tuesday',
    'wednesday' = 'wednesday',
    'thursday' = 'thursday',
    'friday' = 'friday',
    'saturday' = 'saturday',
    'sunday' = 'sunday',
}

export function getDefaultWeekdays(): EntryWeekdays {
    return Object.keys(Weekdays).reduce((acc: EntryWeekdays, day) => {
        return {
            ...acc,
            [day]: false
        }
    }, {} as EntryWeekdays)
}