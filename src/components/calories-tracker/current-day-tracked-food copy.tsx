import { Component, h, Prop, State } from "@stencil/core"

import type { Food } from "../../entities/food"

import type { GetTrackedFoodForDay, RemoveFoodFromDay } from "./service/interface"


export interface FoodService extends GetTrackedFoodForDay, RemoveFoodFromDay {}

@Component(
    {
        styleUrl: "index.css",
        tag: "current-day-food-list",
    },
)
export class CurrentDayFoodList {
    @State() public daysFood: Food[] = []
    @State() public error: Error
    @Prop() public service: FoodService
    @Prop() public dayMonthYear: string

    public componentDidLoad(): void {
        const router = document.querySelector("ion-router")

        router.addEventListener("ionRouteDidChange", async () => {
            const [daysFood, error] = await this.service.getTrackedFoodForDay(this.dayMonthYear)

            if (daysFood) {
                this.daysFood = daysFood
            }

            if (error) {
                this.error = error
            }
        })
    }

    public render(): Element[] {
        return [
                <ion-list lines="none">
                    {this.daysFood.map((food) => (
                        <ion-item-sliding>
                            <ion-item class="holding">
                                <ion-label>
                                    <p>
                                        <strong>
                                            {food.name}
                                        </strong>
                                    </p>
                                    <p class="amount">
                                        {food.amount}
                                    </p>
                                    <p class="value">{food.energy}</p>
                                </ion-label>
                            </ion-item>

                            <ion-item-options>
                                <ion-item-option color="danger" onClick={this.deleteFoodFromDay(food)}>
                                    <ion-icon slot="icon-only" name="trash"></ion-icon>
                                </ion-item-option>
                            </ion-item-options>
                        </ion-item-sliding>
                    ))}
                </ion-list>
        ]
    }

    private deleteFoodFromDay(food: Food) {
        const { id } = food
        return (_: Event) => {
            this.service.removeFoodFromDay(this.dayMonthYear, id).then((result) => {
                const [success] = result

                if (success) {
                    const index = this.daysFood.findIndex((f: Food) => f.id === id)
                    this.daysFood = [
                        ...this.daysFood.slice(0, index),
                        ...this.daysFood.slice(index + 1, this.daysFood.length),
                    ]
                }
            })
        }
    }
}


