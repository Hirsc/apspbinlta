import type { DayMacros, Food } from "../../../entities/food"
import type { ID } from "../../../entities/id"
import type { Success } from "../../../entities/success"

export interface AddFoodToADay {
    addFoodToADay: (item: Food, dayDate: string) => Promise<[ID?, Error?]>
}
export interface GetTrackedFoodForDay {
    getTrackedFoodForDay: (dayDate: string) => Promise<[Food[]?, Error?]>
}

export interface RemoveFoodFromDay {
    removeFoodFromDay: (dayMonthYear: string, id: ID) => Promise<[Success?, Error?]>
}

export interface MonthTrackingStatus {
    monthTrackingStatus: (month: string) => Promise<[MonthStatusMatrix?, Error?]>
}

export enum TrackingStatus {
    'TRACKED' = 'TRACKED',
    'NOT_TRACKED' = 'NOT_TRACKED',
}
export interface MonthStatusMatrix {
    [key: string]: TrackingStatus,
}

export interface GetTrackedMacrosOfADay {
    getTrackedMacrosOfADay: (dayMonthYear: string) => Promise<[DayMacros?, Error?]>
}
