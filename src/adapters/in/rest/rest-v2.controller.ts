import { Body, Controller, Delete, Inject, NotFoundException, Param, Patch, Put } from '@nestjs/common';
import { ShoppingListResponse } from './dto/shopping-list-response.dto';
import { ShoppingListService } from 'src/domain/shopping-list.service';
import { RecipeRequest } from './dto/recipe-request.dto';
import { QuantifiedIngredientRequest } from './dto/quantified-ingredient-request.dto';

@Controller('api/v2/shopping-list')
export class ShoppingListRestV2Controller {

    constructor(
        @Inject('ShoppingListService')
        private readonly shoppingListService: ShoppingListService,
    ) { }

    @Patch(':id/recipe')
    async addRecipeToShoppingList(@Param('id') id: string, @Body() recipeRequest: RecipeRequest): Promise<ShoppingListResponse> {
        let shoppingList = await this.shoppingListService.addRecipeToShoppingList(id, recipeRequest.id);

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new NotFoundException('Shopping List not found');
    }
    
    @Delete(':id/recipe/:recipeId')
    async removeRecipeFromShoppingList(@Param('id') id: string, @Param('recipeId') recipeId: string): Promise<ShoppingListResponse> {
        let shoppingList = await this.shoppingListService.removeRecipeFromShoppingList(id, recipeId);

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new NotFoundException('Shopping List not found');
    }

    @Patch(':id/purchased-ingredient')
    async addPurchasedIngredientToShoppingList(@Param('id') id: string, @Body() quantifiedIngredientRequest: QuantifiedIngredientRequest): Promise<ShoppingListResponse> {
        quantifiedIngredientRequest = new QuantifiedIngredientRequest(quantifiedIngredientRequest);

        let shoppingList = await this.shoppingListService.addPurchasedIngredientToShoppingList(id, quantifiedIngredientRequest.toQuantifiedIngredient());

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new NotFoundException('Shopping List not found');
    }

    @Delete(':id/purchased-ingredient/:ingredientId')
    async removePurchasedIngredientFromShoppingList(@Param('id') id: string, @Param('ingredientId') ingredientId: number): Promise<ShoppingListResponse> {
        let shoppingList = await this.shoppingListService.removePurchasedIngredientFromShoppingList(id, ingredientId);

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new NotFoundException('Shopping List not found');
    }

    @Put(':id/total-ingredients')
    async updateTotalIngredientsInShoppingList(@Param('id') id: string): Promise<ShoppingListResponse> {
        let shoppingList = await this.shoppingListService.updateTotalIngredientsInShoppingList(id);

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new NotFoundException('Shopping List not found');
    }

}
