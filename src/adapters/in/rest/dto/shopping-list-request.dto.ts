import { ShoppingList } from "src/domain/model/shopping-list.type";

export class ShoppingListCreateRequest {
    name: string;
    author: string;
    
    constructor(data: Partial<ShoppingListCreateRequest>) {
        Object.assign(this, data);
    }
    
    toShoppingList(): ShoppingList {
        return new ShoppingList({
            name: this.name,
            author: this.author,
            recipes: [],
            changedRecipes: [],
            totalIngredients: [],
            purchasedIngredients: [],
            finished: false,
        });
    }
}

export class ShoppingListUpdateRequest {
    name: string;
    author: string;
    finished: boolean;
    
    constructor(data: Partial<ShoppingListUpdateRequest>) {
        Object.assign(this, data);
    }
    
    toShoppingList(existing: ShoppingList): ShoppingList {
        return new ShoppingList({
            id: existing.id,
            name: this.name,
            author: this.author,
            recipes: existing.recipes,
            changedRecipes: existing.changedRecipes,
            totalIngredients: existing.totalIngredients,
            purchasedIngredients: existing.purchasedIngredients,
            finished: this.finished,
        });
    }
}