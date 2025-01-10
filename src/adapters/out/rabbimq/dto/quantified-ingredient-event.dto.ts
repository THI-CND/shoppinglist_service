import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";

export class QuantifiedIngredientEvent {
    ingredient: number;
    quantity: number;

    constructor(data: Partial<QuantifiedIngredientEvent>) {
        Object.assign(this, data);
    }

    static fromQuantifiedIngredient(quantifiedIngredient: QuantifiedIngredient): QuantifiedIngredientEvent {
        return new QuantifiedIngredientEvent({
            ingredient: quantifiedIngredient.ingredient,
            quantity: quantifiedIngredient.quantity,
        });
    }
}