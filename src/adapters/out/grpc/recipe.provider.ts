import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { RecipeProvider } from "src/ports/out/recipe.provider";

@Injectable()
export class GrpcRecipeProvider implements RecipeProvider, OnModuleInit {

    private recipeService;

    constructor(
        @Inject('RECIPE_SERVICE')
        private readonly client: ClientGrpc,
    ) { }

    onModuleInit() {
        this.recipeService = this.client.getService('RecipeService');
    }

    getTotalIngredients(recipeId: string): Promise<QuantifiedIngredient[]> {
        return this.recipeService
            .getTotalIngredients({
                id: recipeId,
            })
            .toPromise()
            .then(
                (response) => {
                    return response.totalIngredients;
                }
            );
    }

}
