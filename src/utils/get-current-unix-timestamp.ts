import { UnixTimestamp } from "./unix-timestamp"

export function getCurrentUnixTimestamp(): UnixTimestamp {
    return Math.round((new Date()).getTime() / 1000)
}
