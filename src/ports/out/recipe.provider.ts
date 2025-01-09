import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";

export interface RecipeProvider {
    getTotalIngredients(recipeId: string): QuantifiedIngredient[];
}
