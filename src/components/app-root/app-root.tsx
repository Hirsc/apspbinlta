import { Component, h } from "@stencil/core"
import { format } from "date-fns"

import { OpenFoodFactsService } from "../../open-food-facts"
import { StorageService } from "../../services/storage"
import { CaloriesService } from "../calories-tracker/service"

const foodService = new CaloriesService(StorageService)
const foodInformationService = new OpenFoodFactsService()

@Component({
    styleUrl: "app-root.css",
    tag: "app-root",
})
export class AppRoot {

    public render(): Element[] {
        const todayMonthYear = format(new Date(), 'dd-MM-yyyy')
        return (
            <ion-app>
                <ion-router useHash={false}>
                    <ion-route url="/" component="day-overview" componentProps={{ dayMonthYear: todayMonthYear }} />
                    <ion-route
                        url="/add"
                        component="scan-food"
                        componentProps={{ foodService, foodInformationService, dayMonthYear: todayMonthYear }}
                    />
                    <ion-route url="/profile/:name" component="app-profile" />
                </ion-router>
                <ion-nav />
            </ion-app>
        )
    }
}
