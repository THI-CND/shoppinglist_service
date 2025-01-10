import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { ShoppingList } from "src/domain/model/shopping-list.type";
import { ShoppingListEvents } from "src/ports/out/shopping-list.events";
import { ShoppingListDeletedEvent, ShoppingListEvent } from "./dto/shopping-list-event.dto";

@Injectable()
export class ShoppingListEventsImpl implements ShoppingListEvents, OnModuleInit {

    constructor(
        @Inject('SHOPPING_LIST_EVENTS')
        private readonly client: ClientRMQ,
    ) { }

    async onModuleInit() {
        await this.client.connect();
    }

    shoppingListCreated(shoppingList: ShoppingList): void {
        this.client['channel'].publish(
            process.env.RABBIT_EXCHANGE || 'recipemanagement',
            'shoppinglist.created', 
            JSON.stringify(
                ShoppingListEvent.fromShoppingList(shoppingList),
            ),
        );
    }

    shoppingListUpdated(shoppingList: ShoppingList): void {
        this.client['channel'].publish(
            process.env.RABBIT_EXCHANGE || 'recipemanagement',
            'shoppinglist.updated', 
            JSON.stringify(
                ShoppingListEvent.fromShoppingList(shoppingList),
            ),
        );
    }

    shoppingListDeleted(id: string): void {
        this.client['channel'].publish(
            process.env.RABBIT_EXCHANGE || 'recipemanagement',
            'shoppinglist.deleted', 
            JSON.stringify(
                ShoppingListDeletedEvent.fromId(id),
            ),
        );
    }

}
