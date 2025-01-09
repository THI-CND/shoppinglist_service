import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { Column } from "typeorm";

export class QuantifiedIngredientEntity {

    @Column()
    ingredient: number;

    @Column()
    quantity: number;

    constructor(data?: Partial<QuantifiedIngredientEntity>) {
        Object.assign(this, data);
    }

    static fromQuantifiedIngredient(quantifiedIngredient: QuantifiedIngredient): QuantifiedIngredientEntity {
        return new QuantifiedIngredientEntity({
            ingredient: quantifiedIngredient.ingredient,
            quantity: quantifiedIngredient.quantity,
        });
    }

    toQuantifiedIngredient(): QuantifiedIngredient {
        return new QuantifiedIngredient({
            ingredient: this.ingredient,
            quantity: this.quantity,
        });
    }

}
