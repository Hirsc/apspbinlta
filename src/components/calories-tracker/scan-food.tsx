import type { InputChangeEventDetail } from "@ionic/core"
import { Component, h, Prop, State, Watch } from "@stencil/core"

import type { Food } from "../../entities/food"
import type { FoodInformation } from "../../entities/food-information"
import { NotFound } from "../../entities/not-found"
import type { Getter } from "../../open-food-facts/getter"
import { toastError } from "../toasts/error"

import type { AddFoodToADay } from "./service/interface"

export type FoodService = AddFoodToADay
export type FoodInformationService = Getter<FoodInformation>

@Component(
    {
        styleUrl: "index.css",
        tag: "scan-food",
    },
)
export class ScanFood {
    @State() public formControls: Food = {
        name: null,
        code: null,
        id: null,
        protein: null,
        fat: null,
        carbonhydrate: null,
        energy: null,
        amount: null,    
    }
    @Prop() public foodService: FoodService
    @Prop() public foodInformationService: FoodInformationService
    @Prop() public dayMonthYear: string
    @State() private error: Error

    private title = "Add Food"

    constructor() {
        this.changecodeCode = this.changecodeCode.bind(this)
        this.changeName = this.changeName.bind(this)
    }

    public componentDidLoad(): void {
        this.formControls = {
            ...this.formControls,
            code: "5449000000996",
        }
    }

    public render(): Element[] {
        return [
            <ion-header translucent={true}>
                <ion-toolbar color="primary">
                    <ion-buttons slot="start">
                        <ion-back-button
                            defaultHref="/"
                        />
                    </ion-buttons>
                    <ion-title>{this.title}</ion-title>
                </ion-toolbar>
            </ion-header>,
            (
                this.formControls.code === null &&
                <ion-content color="dark">
                    <barcode-reader
                        onCodeChange={this.changecodeCode}
                    />
                </ion-content>
            ),
            (
                this.formControls.code !== null &&
                <ion-content>
                    {this.error &&
                        <ion-item
                            class="root ion-text-center"
                        >
                            <ion-label
                                position="stacked"
                                mode="ios"
                            >
                                Food Name
                        </ion-label>
                            <ion-input
                                type="text"
                                onIonChange={this.changeName}
                            />
                        </ion-item>
                    }
                </ion-content>
            ),
            <ion-alert-controller></ion-alert-controller>,
        ]
    }

    @Watch("formControls")
    private async watchHandler(newValue: Food, oldValue: Food) {
        if (oldValue.code !== newValue.code) {
            const [foodInformation, error] = await this.foodInformationService.get(newValue.code)

            if (error) {
                toastOFFError(error)
                this.error = error

                this.formControls = {
                    ...this.formControls,
                    code: null,
                }
            }

            if (foodInformation) {
                this.formControls = {
                    ...this.formControls,
                    name: foodInformation.name,
                }
            }

        }

        if (
            newValue.code !== null
            && newValue.name !== null
        ) {
            this.saveFood()
        }
    }

    private saveFood() {
        this.foodService.addFoodToADay(this.formControls, this.dayMonthYear)
        window.history.back()
    }

    private changecodeCode(newCode: string) {
        this.formControls = {
            ...this.formControls,
            code: newCode,
        }
    }

    private changeName(event: CustomEvent<InputChangeEventDetail>) {
        this.formControls = {
            ...this.formControls,
            name: event.detail.value,
        }
    }
}

function toastOFFError(error: Error) {
    if (error instanceof NotFound) {
        toastError("Product not found. Try again")
        return
    }

    toastError("Something unknown went wrong. Try again")
    return

}
