export type Survey = Entry[]
export interface Entry {
    name: string
    weekdays: {
        [key in Weekdays]: boolean
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
