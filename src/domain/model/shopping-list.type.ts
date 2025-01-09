import { QuantifiedIngredient } from "./quantified-ingredient.type";

export class ShoppingList {
    id?: string;
    name: string;
    author: string;
    recipes: string[];
    changedRecipes: string[];
    totalIngredients: QuantifiedIngredient[];
    purchasedIngredients: QuantifiedIngredient[];
    finished: boolean;

    constructor(data: Partial<ShoppingList>) {
        Object.assign(this, data);
    }
}