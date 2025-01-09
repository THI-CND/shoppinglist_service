import { ShoppingList } from "src/domain/model/shopping-list.type";

export interface ShoppingListRepository {
    getShoppingLists(): Promise<ShoppingList[]>;
    getShoppingList(id: string): Promise<ShoppingList | undefined>;
    saveShoppingList(shoppingList: ShoppingList): Promise<ShoppingList>;
    deleteShoppingList(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
}
