import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";

export class QuantifiedIngredientRequest {
    ingredient: number;
    quantity: number;
    
    constructor(data: Partial<QuantifiedIngredientRequest>) {
        Object.assign(this, data);
    }

    toQuantifiedIngredient(): QuantifiedIngredient {
        return new QuantifiedIngredient({
            ingredient: this.ingredient,
            quantity: this.quantity,
        });
    }
}