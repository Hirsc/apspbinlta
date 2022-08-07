export interface Repository<T> {
    findOccurence(t: string): T | undefined
    get(): T[]
    add(entry: T): T
    update(entry: T): T
}
