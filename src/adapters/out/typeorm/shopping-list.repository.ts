import { InjectRepository } from "@nestjs/typeorm";
import { ShoppingList } from "src/domain/model/shopping-list.type";
import { ShoppingListRepository } from "src/ports/out/shopping-list.repository";
import { ShoppingListEntity } from "./entity/shopping-list.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ShoppingListRepositoryImpl implements ShoppingListRepository {

    constructor(
        @InjectRepository(ShoppingListEntity)
        private readonly shoppingListRepository: Repository<ShoppingListEntity>,
    ) { }

    getShoppingLists(): Promise<ShoppingList[]> {
        return this.shoppingListRepository
            .find()
            .then(
                (entities) => {
                    return entities.map(
                        (entity) => {
                            return entity.toShoppingList();
                        }
                    );
                }
            );
    }

    getShoppingList(id: string): Promise<ShoppingList | undefined> {
        return this.shoppingListRepository
            .findOne({
                where: { 
                    id: id,
                },
            })
            .then(
                (entity) => {
                    if (entity)
                        return entity.toShoppingList();

                    return undefined;
                }
            );
    }

    saveShoppingList(shoppingList: ShoppingList): Promise<ShoppingList> {
        return this.shoppingListRepository
            .save(ShoppingListEntity.fromShoppingList(shoppingList))
            .then(
                (entity) => {
                    return entity.toShoppingList();
                }
            );
    }

    deleteShoppingList(id: string): Promise<void> {
        return this.shoppingListRepository
            .delete(id)
            .then(
                () => {
                    return;
                }
            );
    }

    exists(id: string): Promise<boolean> {
        return this.shoppingListRepository
            .exists({
                where: {
                    id: id,
                }
            });
    }

}
