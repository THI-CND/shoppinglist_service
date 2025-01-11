import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";

export class QuantifiedIngredientResponse {
    ingredient: number;
    quantity: number;

    constructor(data: Partial<QuantifiedIngredientResponse>) {
        Object.assign(this, data);
    }

    static fromQuantifiedIngredient(quantifiedIngredient: QuantifiedIngredient): QuantifiedIngredientResponse {
        return new QuantifiedIngredientResponse({
            ingredient: quantifiedIngredient.ingredient,
            quantity: quantifiedIngredient.quantity,
        });
    }
}