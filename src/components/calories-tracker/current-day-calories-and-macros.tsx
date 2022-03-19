import { Component, h, Prop, State } from "@stencil/core"

import type { DayMacros } from "../../entities/food"

import type { GetTrackedMacrosOfADay, RemoveFoodFromDay } from "./service/interface"


export interface FoodService extends GetTrackedMacrosOfADay, RemoveFoodFromDay {}

@Component(
    {
        styleUrl: "index.css",
        tag: "current-day-macros",
    },
)
export class CurrentDayMacros {
    @State() public dayMacros: DayMacros = {} as DayMacros
    @State() public error: Error
    @Prop() public service: FoodService
    @Prop() public dayMonthYear: string

    public componentDidLoad(): void {
        const router = document.querySelector("ion-router")

        router.addEventListener("ionRouteDidChange", async () => {
            const [dayMacros, error] = await this.service.getTrackedMacrosOfADay(this.dayMonthYear)

            if (dayMacros) {
                this.dayMacros = dayMacros
            }

            if (error) {
                this.error = error
            }
        })
    }

    public render(): Element[] {
        return [
            <ion-content>
                <p>
                    carbonhydrate: {this.dayMacros.carbonhydrate}
                </p> 
                <p>
                    energy: {this.dayMacros.energy}
                </p>
                <p>
                    fat: {this.dayMacros.fat}
                </p>
                <p>
                    protein: {this.dayMacros.protein}
                </p>
            </ion-content>,
        ]
    }
}


