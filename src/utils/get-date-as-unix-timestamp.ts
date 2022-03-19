import { UnixTimestamp } from "./unix-timestamp"


export function getDateAsUnixTimestamp(date: Date): UnixTimestamp {
    return Math.round((date).getTime() / 1000)
}
