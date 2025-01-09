import { QuantifiedIngredient } from "./model/quantified-ingredient.type";

export interface RecipeService {
    getTotalIngredients(recipeId: string): QuantifiedIngredient[];
}
