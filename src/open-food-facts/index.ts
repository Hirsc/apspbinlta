import { EuropeanArticelNumber } from "../entities/european-articel-number"
import { FoodInformation } from "../entities/food-information"
import { NotFound } from "../entities/not-found"
import { Getter } from "./getter"

export class OpenFoodFactsService implements Getter<FoodInformation> {

    private foodInformationApi: string
    private protocol = "https"
    private version = "v0"
    private agent = `octacmsibmo - PWA - Version 0 - https://octacmsibmo.com - ${navigator.userAgent}`

    constructor(
        private country = "world",
    ) {
        this.foodInformationApi = `${this.protocol}://${this.country}.openfoodfacts.org/api/${this.version}`
    }

    public async get(ean: EuropeanArticelNumber): Promise<[FoodInformation?, Error?]> {
        try {
            const response = await fetch(
                `${this.foodInformationApi}/product/${ean}.json`,
                {
                    headers: {
                        "Accept": "application/json",
                        "User-Agent": this.agent,
                    },
                    method: "GET",
                },
            )

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const offResponse: OFFResponse = await response.json()

            validateResponse(offResponse)

            return [{ name: offResponse.product.product_name }]
        } catch (error) {
            console.error(`Fetching product failed with an error: \n ${error}`)
            return [, error]
        }
    }
}


function validateResponse(response: OFFResponse) {
    if (response.status === 0) {
        throw new NotFound(response.status_verbose)
    }
}

interface OFFResponse {
    product: Product
    code: EuropeanArticelNumber
    status_verbose: StatusVerbose
    status: Status
}

type StatusVerbose = "product found"
type Status = 1 | 0


interface Product {
    product_name: string
    nutriscore_data: {
        sodium: number,
        saturated_fat_ratio_value: number,
        is_beverage: number,
        fiber_points: number,
        is_cheese: number,
        sugars_value: number,
        fiber: number,
        energy_value: number,
        saturated_fat_ratio_points: number,
        sugars_points: number,
        fiber_value: number,
        sodium_points: number,
        fruits_vegetables_nuts_colza_walnut_olive_oils_value: number,
        proteins_points: number,
        energy: number,
        is_water: number,
        saturated_fat_value: number,
        energy_points: number,
        fruits_vegetables_nuts_colza_walnut_olive_oils: number,
        proteins_value: number,
        sugars: number,
        fruits_vegetables_nuts_colza_walnut_olive_oils_points: number,
        grade: string,
        negative_points: number,
        sodium_value: number,
        saturated_fat_points: number,
        is_fat: number,
        proteins: number,
        saturated_fat_ratio: number,
        score: number,
        saturated_fat: number,
        positive_points: number,
    },
    "nutriments": {
        "salt": 0.02,
        "nova-group_100g": 2,
        "saturated-fat_unit": "g",
        "proteins_value": 0.5,
        "nutrition-score-fr_100g": 15,
        "energy_unit": "kJ",
        "carbohydrates_unit": "g",
        "salt_value": 0.02,
        "fat_100g": 65,
        "energy-kj_unit": "kJ",
        "energy-kj": 2422,
        "sugars_100g": 0.5,
        "sugars": 0.5,
        "energy-kj_100g": 2422,
        "proteins_100g": 0.5,
        "proteins": 0.5,
        "sodium_value": 0.008,
        "sugars_unit": "g",
        "salt_100g": 0.02,
        "carbohydrates": 0.5,
        "energy-kcal_unit": "kcal",
        "energy_100g": 2422,
        "fat": 65,
        "sodium_100g": 0.008,
        "saturated-fat": 35,
        "energy-kj_value": 2422,
        "salt_unit": "g",
        "proteins_unit": "g",
        "sodium": 0.008,
        "sodium_unit": "g",
        "nova-group": 2,
        "energy-kcal_100g": 589,
        "energy-kcal_value": 589,
        "energy-kcal": 589,
        "fat_unit": "g",
        "energy_value": 2422,
        "nova-group_serving": 2,
        "sugars_value": 0.5,
        "carbohydrates_value": 0.5,
        "saturated-fat_100g": 35,
        "energy": 2422,
        "saturated-fat_value": 35,
        "fruits-vegetables-nuts-estimate-from-ingredients_100g": 0,
        "fat_value": 65,
        "carbohydrates_100g": 0.5,
        "nutrition-score-fr": 15
    },
    [key: string]: any
}
