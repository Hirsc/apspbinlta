import { Entry, Survey, Weekdays } from './survey'
import { isEmpty } from 'lodash'

export type Total = {
    [key in WeekdayKey]: number;
};
export type Marked = WeekdayKey[]
export type WeekdayKey = keyof typeof Weekdays;

export function getTotalParticipientsByColumns(rows: Survey): Total {
    const columns = rows.reduce(
        (acc, row: Entry) => {
            if (!isEmpty(row)) {
                acc['monday'] = row.weekdays.monday === true ? acc['monday'] + 1 : acc['monday']
                acc['tuesday'] = row.weekdays.tuesday === true ? acc['tuesday'] + 1 : acc['tuesday']
                acc['wednesday'] = row.weekdays.wednesday === true ? acc['wednesday'] + 1 : acc['wednesday']
                acc['thursday'] = row.weekdays.thursday === true ? acc['thursday'] + 1 : acc['thursday']
                acc['friday'] = row.weekdays.friday === true ? acc['friday'] + 1 : acc['friday']
                acc['saturday'] = row.weekdays.saturday === true ? acc['saturday'] + 1 : acc['saturday']
                acc['sunday'] = row.weekdays.sunday === true ? acc['sunday'] + 1 : acc['sunday']
            }

            return acc
        }, { monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 }
    )

    return columns
}
