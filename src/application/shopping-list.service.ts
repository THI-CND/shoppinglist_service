import { Inject, Injectable } from "@nestjs/common";
import { QuantifiedIngredient } from "src/domain/model/quantified-ingredient.type";
import { ShoppingList } from "src/domain/model/shopping-list.type";
import { ShoppingListService } from "src/domain/shopping-list.service";
import { RecipeProvider } from "src/ports/out/recipe.provider";
import { ShoppingListEvents } from "src/ports/out/shopping-list.events";
import { ShoppingListRepository } from "src/ports/out/shopping-list.repository";
import { addAbortSignal, PassThrough } from "stream";

@Injectable()
export class ShoppingListServiceImpl implements ShoppingListService {

    constructor(
        @Inject('ShoppingListRepository')
        private readonly shoppingListRepository: ShoppingListRepository,
        @Inject('RecipeProvider')
        private readonly recipeProvider: RecipeProvider,
        @Inject('ShoppingListEvents')
        private readonly shoppingListEvents: ShoppingListEvents,
    ) { }

    getShoppingLists(): Promise<ShoppingList[]> {
        return this.shoppingListRepository.getShoppingLists();
    }

    getShoppingList(id: string): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository.getShoppingList(id);
    }

    createShoppingList(shoppingList: ShoppingList): Promise<ShoppingList> {
        return this.shoppingListRepository
            .saveShoppingList(shoppingList)
            .then(
                (shoppingList) => {
                    this.shoppingListEvents.shoppingListCreated(shoppingList);
                    return shoppingList;
                }
            );
    }

    updateShoppingList(shoppingList: ShoppingList): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .exists(shoppingList.id)
            .then(
                (exists) => {
                    if (exists)
                        return this.shoppingListRepository
                            .saveShoppingList(shoppingList)
                            .then(
                                (shoppingList) => {
                                    this.shoppingListEvents.shoppingListUpdated(shoppingList);
                                    return shoppingList;
                                }
                            );

                    return undefined;
                }
            )
    }

    deleteShoppingList(id: string): Promise<void> {
        return this.shoppingListRepository
            .deleteShoppingList(id)
            .then(
                () => {
                    this.shoppingListEvents.shoppingListDeleted(id);
                }
            );
    }

    addRecipeToShoppingList(shoppingListId: string, recipeId: string): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .getShoppingList(shoppingListId)
            .then(
                (shoppingList) => {
                    if (shoppingList) {
                        shoppingList.recipes.push(recipeId);

                        return this.recipeProvider
                            .getTotalIngredients(recipeId)
                            .then(
                                (totalIngredients) => {
                                    if (totalIngredients) {
                                        shoppingList.totalIngredients = this.flattenAndSumIngredients([
                                            shoppingList.totalIngredients,
                                            totalIngredients,
                                        ]);
                        
                                        return this.shoppingListRepository
                                            .saveShoppingList(shoppingList)
                                            .then(
                                                (shoppingList) => {
                                                    this.shoppingListEvents.shoppingListUpdated(shoppingList);
                                                    return shoppingList;
                                                }
                                            );
                                    }

                                    return undefined;
                                }
                            );
                    }

                    return undefined;
                }
            );
    }

    removeRecipeFromShoppingList(shoppingListId: string, recipeId: string): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .getShoppingList(shoppingListId)
            .then(
                (shoppingList) => {
                    if (shoppingList) {
                        shoppingList.recipes = shoppingList.recipes.filter(
                            (id) => {
                                return id !== recipeId;
                            }
                        );
                        
                        return this.recipeProvider
                            .getTotalIngredients(recipeId)
                            .then(
                                (totalIngredients) => {
                                    if (totalIngredients) {
                                        shoppingList.totalIngredients = this.flattenAndSumIngredients([
                                            shoppingList.totalIngredients,
                                            totalIngredients.map(
                                                (ingredient) => ({
                                                    ingredient: ingredient.ingredient,
                                                    quantity: -ingredient.quantity,
                                                })
                                            ),
                                        ]);
                        
                                        return this.shoppingListRepository
                                            .saveShoppingList(shoppingList)
                                            .then(
                                                (shoppingList) => {
                                                    this.shoppingListEvents.shoppingListUpdated(shoppingList);
                                                    return shoppingList;
                                                }
                                            );
                                    }

                                    return undefined;
                                }
                            );
                    }

                    return undefined;
                }
            );
    }

    addPurchasedIngredientToShoppingList(shoppingListId: string, purchasedIngredient: QuantifiedIngredient): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .getShoppingList(shoppingListId)
            .then(
                (shoppingList) => {
                    if (shoppingList) {
                        let existingIngredient = shoppingList.purchasedIngredients.find(
                            ingredient => ingredient.ingredient === purchasedIngredient.ingredient
                        );
                        
                        existingIngredient 
                            ? existingIngredient.quantity += purchasedIngredient.quantity 
                            : shoppingList.purchasedIngredients.push({ 
                                ingredient: purchasedIngredient.ingredient, 
                                quantity: purchasedIngredient.quantity 
                            });

                        return this.shoppingListRepository
                            .saveShoppingList(shoppingList)
                            .then(
                                (shoppingList) => {
                                    this.shoppingListEvents.shoppingListUpdated(shoppingList);
                                    return shoppingList;
                                }
                            );
                    }

                    return undefined;
                }
            );
    }

    removePurchasedIngredientFromShoppingList(shoppingListId: string, purchasedIngredientId: number): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .getShoppingList(shoppingListId)
            .then(
                (shoppingList) => {
                    if (shoppingList) {
                        shoppingList.purchasedIngredients = shoppingList.purchasedIngredients.filter(
                            (ingredient) => {
                                return ingredient.ingredient !== purchasedIngredientId;
                            }
                        );

                        return this.shoppingListRepository
                            .saveShoppingList(shoppingList)
                            .then(
                                (shoppingList) => {
                                    this.shoppingListEvents.shoppingListUpdated(shoppingList);
                                    return shoppingList;
                                }
                            );
                    }

                    return undefined;
                }
            );
    }

    private flattenAndSumIngredients(nestedIngredients: QuantifiedIngredient[][]): QuantifiedIngredient[] {
        const flatMap = new Map<number, number>();

        for (const ingredients of nestedIngredients) {
            for (const ingredient of ingredients) {
                const existingQuantity = flatMap.get(ingredient.ingredient);
                flatMap.set(ingredient.ingredient, (existingQuantity || 0) + ingredient.quantity);
            }
        }

        return Array.from(flatMap.entries()).map(([ingredient, quantity]) => (new QuantifiedIngredient({ ingredient, quantity })));
    }

    async updateTotalIngredientsInShoppingList(shoppingListId: string): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .getShoppingList(shoppingListId)
            .then(
                async (shoppingList) => {
                    if (shoppingList) {
                        let nestedTotalIngredients = [];
                        for (let recipeId of shoppingList.recipes) 
                            nestedTotalIngredients.push(await this.recipeProvider.getTotalIngredients(recipeId));

                        shoppingList.totalIngredients = this.flattenAndSumIngredients(nestedTotalIngredients);

                        return this.shoppingListRepository
                            .saveShoppingList(shoppingList)
                            .then(
                                (shoppingList) => {
                                    this.shoppingListEvents.shoppingListUpdated(shoppingList);
                                    return shoppingList;
                                }
                            );
                    }

                    return undefined;
                }
            )
    }

}
