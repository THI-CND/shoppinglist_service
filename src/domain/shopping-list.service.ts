import { QuantifiedIngredient } from "./model/quantified-ingredient.type";
import { ShoppingList } from "./model/shopping-list.type";

export interface ShoppingListService {
    getShoppingLists(): ShoppingList[];
    getShoppingList(id: string): ShoppingList | undefined;
    createShoppingList(shoppingList: ShoppingList): ShoppingList;
    updateShoppingList(shoppingList: ShoppingList): ShoppingList | undefined;
    deleteShoppingList(id: string): void;
    addRecipeToShoppingList(shoppingListId: string, recipeId: string): ShoppingList | undefined;
    removeRecipeFromShoppingList(shoppingListId: string, recipeId: string): ShoppingList | undefined;
    addPurchasedIngredientToShoppingList(shoppingListId: string, purchasedIngredient: QuantifiedIngredient): ShoppingList | undefined;
    removePurchasedIngredientFromShoppingList(shoppingListId: string, purchasedIngredientId: string): ShoppingList | undefined;
    updateTotalIngredientsInShoppingList(shoppingListId: string): ShoppingList | undefined;
}
