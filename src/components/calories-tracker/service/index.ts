import { getDaysInMonth } from "date-fns"

import type { DayMacros, Food } from "../../../entities/food"
import type { ID } from "../../../entities/id"
import type { StorageService, StorageServiceCreator } from "../../../services/storage"
import { UnixTimestamp } from "../../../utils/unix-timestamp"

import type { 
    AddFoodToADay,
    GetTrackedMacrosOfADay,
    MonthStatusMatrix,
    MonthTrackingStatus,
    RemoveFoodFromDay} from "./interface";
import {
    TrackingStatus,
} from "./interface"

const StorageKeyPrefix = "foods"

export class CaloriesService implements AddFoodToADay, RemoveFoodFromDay, MonthTrackingStatus, GetTrackedMacrosOfADay {
    private storageService: StorageService<Food[]>

    constructor(StorageCreator: StorageServiceCreator) {
        this.storageService = new StorageCreator<Food[]>()
    }

    private async getTrackedFoodForDay(dayMonthYear: string): Promise<[Food[]?, Error?]> {
        try {
            const foods = await this.storageService.get(`${StorageKeyPrefix}-${dayMonthYear}`)

            if (!foods) {
                return []
            }

            return [foods, undefined]
        } catch {
            return [undefined, new Error()]
        }
    }

    public async monthTrackingStatus(monthYear: string /* e.g. 01-2000*/ ): Promise<[MonthStatusMatrix?, Error?]> {
        try {
            const daysInMonth = getDaysInMonth(new Date(monthYear))
            const matrix: MonthStatusMatrix = {} 

            for(let day = 0; day < daysInMonth; day++) {
                const dayMonthYear = `${day}-${monthYear}`;
                const foodsOfDayInMonth = await this.storageService.get(`${StorageKeyPrefix}-${dayMonthYear}`)
                matrix[dayMonthYear] = TrackingStatus.NOT_TRACKED
                if(foodsOfDayInMonth.length !== 0 ) {
                    matrix[dayMonthYear] = TrackingStatus.TRACKED
                }
            }

            if (!matrix) {
                return []
            }

            return [matrix]
        } catch {
            return [undefined, new Error()]
        }
    }

    public async addFoodToADay(item: Food, dayMonthYear: string): Promise<[ID?, Error?]> {
        const [foods, error] = await this.getTrackedFoodForDay(dayMonthYear)
        const id = UnixTimestamp.getCurrentUnixTimestamp()

        if (foods) {
            const newFood = {
                ...item,
                id,
            }

            foods.push(newFood)
            this.storageService.set(`${StorageKeyPrefix}-${dayMonthYear}`, foods)

            return [id]
        }

        if (error) {
            return [undefined, error]
        }

        return [undefined, undefined]
    }

    public async removeFoodFromDay(dayMonthYear: string, foodId: ID): Promise<[Success?, Error?]> {
        const [foods, error] = await this.getTrackedFoodForDay(dayMonthYear)

        if (foods) {
            const index = foods.findIndex((f: Food) => f.id === foodId)
            foods.splice(index, 1)
            this.storageService.set(`${StorageKeyPrefix}-${dayMonthYear}`, foods)

            return [true]
        }

        if (error) {
            return [undefined, error]
        }

        return [undefined, undefined]
    }

    public async getTrackedMacrosOfADay(dayMonthYear: string): Promise<[DayMacros?, Error?]> {
        const [foods, error] = await this.getTrackedFoodForDay(dayMonthYear)

        if (foods) {
            const dayMacros: DayMacros = foods.reduce((macros: DayMacros, food: Food) => {
                return {
                    protein: food.protein + macros.protein,
                    fat: food.fat + macros.fat,
                    carbonhydrate: food.carbonhydrate + macros.carbonhydrate,
                    energy: food.energy + macros.energy,
                }
            }, {} as DayMacros)
            return [dayMacros, undefined];
        }

        if (error) {
            return [undefined, error]
        }

        return [undefined, undefined]
    }
}

type Success = boolean
