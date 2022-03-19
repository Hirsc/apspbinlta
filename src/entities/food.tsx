import type { EuropeanArticelNumber } from "./european-articel-number"
import type { ID } from "./id"

export interface Food {
    name: string
    code: EuropeanArticelNumber
    id: ID
    protein: Gramm
    fat: Gramm
    carbonhydrate: Gramm
    energy: Kcal
    amount: Gramm
}

export interface DayMacros {
    protein: Gramm
    fat: Gramm
    carbonhydrate: Gramm
    energy: Kcal
}

export type Gramm = number
export type Kcal = number