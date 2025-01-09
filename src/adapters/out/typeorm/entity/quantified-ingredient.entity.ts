import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { Column } from "typeorm";

export class QuantifiedIngredientEntity {

    @Column()
    ingredient: number;

    @Column()
    quantity: number;

    static fromQuantifiedIngredient(quantifiedIngredient: QuantifiedIngredient): QuantifiedIngredientEntity {
        const entity = new QuantifiedIngredientEntity();
        entity.ingredient = quantifiedIngredient.ingredient;
        entity.quantity = quantifiedIngredient.quantity;

        return entity;
    }

    toQuantifiedIngredient(): QuantifiedIngredient {
        return new QuantifiedIngredient({
            ingredient: this.ingredient,
            quantity: this.quantity,
        });
    }

}
