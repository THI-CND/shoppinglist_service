import { QuantifiedIngredient } from "./model/quantified-ingredient.type";
import { ShoppingList } from "./model/shopping-list.type";

export interface ShoppingListService {
    getShoppingLists(): Promise<ShoppingList[]>;
    getShoppingList(id: string): Promise<ShoppingList | undefined>;
    createShoppingList(shoppingList: ShoppingList): Promise<ShoppingList>;
    updateShoppingList(id: string, shoppingList: ShoppingList): Promise<ShoppingList | undefined>;
    deleteShoppingList(id: string): Promise<void>;
    addRecipeToShoppingList(shoppingListId: string, recipeId: string): Promise<ShoppingList | undefined>;
    removeRecipeFromShoppingList(shoppingListId: string, recipeId: string): Promise<ShoppingList | undefined>;
    addPurchasedIngredientToShoppingList(shoppingListId: string, purchasedIngredient: QuantifiedIngredient): Promise<ShoppingList | undefined>;
    removePurchasedIngredientFromShoppingList(shoppingListId: string, purchasedIngredientId: number): Promise<ShoppingList | undefined>;
    updateTotalIngredientsInShoppingList(shoppingListId: string): Promise<ShoppingList | undefined>;
    handleRecipeUpdatedInShoppingLists(recipeId: string): Promise<void>;
}
