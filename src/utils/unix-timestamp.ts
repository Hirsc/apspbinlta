import { getCurrentUnixTimestamp } from "./get-current-unix-timestamp"
import { unixDateToDate } from "./unix-to-date"

export const UnixTimestamp = {
    getCurrentUnixTimestamp,
    unixDateToDate,
}

export type UnixTimestamp = number
