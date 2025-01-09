import { Inject, Injectable } from "@nestjs/common";
import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { RecipeService } from "src/domain/recipe.service";
import { RecipeProvider } from "src/ports/out/recipe.provider";

@Injectable()
export class RecipeServiceImpl implements RecipeService {

    constructor(
        @Inject('RecipeProvider')
        private readonly recipeProvider: RecipeProvider,
    ) { }

    getTotalIngredients(recipeId: string): Promise<QuantifiedIngredient[]> {
        return this.recipeProvider.getTotalIngredients(recipeId);
    }

}
