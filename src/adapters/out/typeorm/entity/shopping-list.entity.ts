import { ShoppingList } from "src/domain/model/shopping-list.type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { QuantifiedIngredientEntity } from "./quantified-ingredient.entity";

@Entity()
export class ShoppingListEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column('text', { array: true })
    recipes: string[];

    @Column('text', { array: true })
    changedRecipes: string[];

    @Column('jsonb', { array: false })
    totalIngredients: QuantifiedIngredientEntity[];

    @Column('jsonb', { array: false})
    purchasedIngredients: QuantifiedIngredientEntity[];

    @Column()
    finished: boolean;

    static fromShoppingList(shoppingList: ShoppingList): ShoppingListEntity {
        const entity = new ShoppingListEntity();
        entity.id = shoppingList.id;
        entity.name = shoppingList.name;
        entity.author = shoppingList.author;
        entity.recipes = shoppingList.recipes;
        entity.changedRecipes = shoppingList.changedRecipes;
        entity.totalIngredients = shoppingList.totalIngredients.map(
            (totalIngredient) => {
                return QuantifiedIngredientEntity.fromQuantifiedIngredient(totalIngredient);
            }
        );
        entity.purchasedIngredients = shoppingList.purchasedIngredients.map(
            (purchasedIngredient) => {
                return QuantifiedIngredientEntity.fromQuantifiedIngredient(purchasedIngredient);
            }
        );
        entity.finished = shoppingList.finished;

        return entity;
    }

    toShoppingList(): ShoppingList {
        return new ShoppingList({
            id: this.id,
            name: this.name,
            author: this.author,
            recipes: this.recipes,
            changedRecipes: this.changedRecipes,
            totalIngredients: this.totalIngredients.map(
                (totalIngredient) => {
                    return totalIngredient.toQuantifiedIngredient();
                }
            ),
            purchasedIngredients: this.purchasedIngredients.map(
                (purchasedIngredient) => {
                    return purchasedIngredient.toQuantifiedIngredient();
                }
            ),
            finished: this.finished,
        });
    }

}
