import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { ShoppingList } from "src/domain/model/shopping-list.type";
import { ShoppingListService } from "src/domain/shopping-list.service";

export class ShoppingListServiceImpl implements ShoppingListService {
    getShoppingLists(): ShoppingList[] {
        throw new Error("Method not implemented.");
    }
    getShoppingList(id: string): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
    createShoppingList(shoppingList: ShoppingList): ShoppingList {
        throw new Error("Method not implemented.");
    }
    updateShoppingList(shoppingList: ShoppingList): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
    deleteShoppingList(id: string): void {
        throw new Error("Method not implemented.");
    }
    addRecipeToShoppingList(shoppingListId: string, recipeId: string): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
    removeRecipeFromShoppingList(shoppingListId: string, recipeId: string): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
    addPurchasedIngredientToShoppingList(shoppingListId: string, purchasedIngredient: QuantifiedIngredient): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
    removePurchasedIngredientFromShoppingList(shoppingListId: string, purchasedIngredientId: string): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
    updateTotalIngredientsInShoppingList(shoppingListId: string): ShoppingList | undefined {
        throw new Error("Method not implemented.");
    }
}
