import { ShoppingList } from "../../../../domain/model/shopping-list.type";
import { QuantifiedIngredientResponse } from "./quantified-ingredient-response.dto";

export class ShoppingListResponse {
    id: string;
    name: string;
    author: string;
    recipes: string[];
    changedRecipes: string[];
    totalIngredients: QuantifiedIngredientResponse[];
    purchasedIngredients: QuantifiedIngredientResponse[];
    finished: boolean;

    constructor(data: Partial<ShoppingListResponse>) {
        Object.assign(this, data);
    }

    static fromShoppingList(shoppingList: ShoppingList): ShoppingListResponse {
        return new ShoppingListResponse({
            id: shoppingList.id,
            name: shoppingList.name,
            author: shoppingList.author,
            recipes: shoppingList.recipes,
            changedRecipes: shoppingList.changedRecipes,
            totalIngredients: shoppingList.totalIngredients.map(
                (totalIngredient) => {
                    return QuantifiedIngredientResponse.fromQuantifiedIngredient(totalIngredient);
                }
            ),
            purchasedIngredients: shoppingList.purchasedIngredients.map(
                (purchasedIngredient) => {
                    return QuantifiedIngredientResponse.fromQuantifiedIngredient(purchasedIngredient);
                }
            ),
            finished: shoppingList.finished,
        });
    }
}
