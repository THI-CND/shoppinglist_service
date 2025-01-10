import { ShoppingList } from "src/domain/model/shopping-list.type";
import { QuantifiedIngredientEvent } from "./quantified-ingredient-event.dto";

export class ShoppingListEvent {
    id: string;
    name: string;
    author: string;
    recipes: string[];
    changedRecipes: string[];
    totalIngredients: QuantifiedIngredientEvent[];
    purchasedIngredients: QuantifiedIngredientEvent[];
    finished: boolean;

    constructor(data: Partial<ShoppingListEvent>) {
        Object.assign(this, data);
    }

    static fromShoppingList(shoppingList: ShoppingList): ShoppingListEvent {
        return new ShoppingListEvent({
            id: shoppingList.id,
            name: shoppingList.name,
            author: shoppingList.author,
            recipes: shoppingList.recipes,
            changedRecipes: shoppingList.changedRecipes,
            totalIngredients: shoppingList.totalIngredients.map(
                (totalIngredient) => {
                    return QuantifiedIngredientEvent.fromQuantifiedIngredient(totalIngredient);
                }
            ),
            purchasedIngredients: shoppingList.purchasedIngredients.map(
                (purchasedIngredient) => {
                    return QuantifiedIngredientEvent.fromQuantifiedIngredient(purchasedIngredient);
                }
            ),
            finished: shoppingList.finished,
        });
    }
}

export class ShoppingListDeletedEvent {
    id: string;

    constructor(data: Partial<ShoppingListDeletedEvent>) {
        Object.assign(this, data);
    }

    static fromId(id: string): ShoppingListDeletedEvent {
        return new ShoppingListDeletedEvent({
            id: id,
        });
    }
}
