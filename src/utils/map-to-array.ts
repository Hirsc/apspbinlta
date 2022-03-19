
export function mapToArray<T>(obj: Map<T>): T[] {
    return Object.keys(obj).map(
        (key: string) => {
            return obj[key]
        },
    )
}

interface Map<T> {
    [key: string]: T
}
