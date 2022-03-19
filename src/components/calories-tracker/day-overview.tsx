import { Component, h, Prop } from "@stencil/core"

import { StorageService } from "../../services/storage"

import { CaloriesService } from "./service/index"

@Component(
    {
        styleUrl: "index.css",
        tag: "day-overview",
    },
)
export class DayOverview {
    @Prop() public dayMonthYear: string
    
    private title = "Food List"
    private foodService: CaloriesService = new CaloriesService(StorageService)


    public render(): Element[] {
        return [
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>{this.title}</ion-title>
                </ion-toolbar>
            </ion-header>,

            <ion-content>
                <current-day-macros service={this.foodService} dayMonthYear={this.dayMonthYear}/>
                <current-day-food-list service={this.foodService} dayMonthYear={this.dayMonthYear}/>

                <ion-fab vertical="bottom" horizontal="start" slot="fixed">
                    <ion-fab-button href="add">
                        <ion-icon name="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>,
        ]
    }

}


