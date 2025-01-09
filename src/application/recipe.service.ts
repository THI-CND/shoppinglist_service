import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { RecipeService } from "src/domain/recipe.service";

export class RecipeServiceImpl implements RecipeService {
    getTotalIngredients(recipeId: string): QuantifiedIngredient[] {
        throw new Error("Method not implemented.");
    }
}
