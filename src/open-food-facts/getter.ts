import { EuropeanArticelNumber } from "../entities/european-articel-number"

export interface Getter<T> {
    get: (ean: EuropeanArticelNumber) => Promise<[T?, Error?]>
}
