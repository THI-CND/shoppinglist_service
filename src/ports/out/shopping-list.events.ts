import { ShoppingList } from "src/domain/model/shopping-list.type";

export interface ShoppingListEvents {
    shoppingListCreated(shoppingList: ShoppingList): void;
    shoppingListUpdated(shoppingList: ShoppingList): void;
    shoppingListDeleted(id: string): void;
}
