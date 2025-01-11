import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { ShoppingListService } from "src/domain/shopping-list.service";
import { RecipeEvent } from "./dto/recipe-event.dto";

@Injectable()
export class RecipeEventSubscriber implements OnModuleInit {

    constructor(
        @Inject('SHOPPING_LIST_EVENTS')
        private readonly client: ClientRMQ,
        @Inject('ShoppingListService')
        private readonly shoppingListService: ShoppingListService,
    ) { }

    async onModuleInit() {
        await this.client.connect();

        await this.client['channel'].assertExchange(
            process.env.RABBIT_EXCHANGE || 'recipemanagement',
            'topic',
        );
        await this.client['channel'].bindQueue(
            'shopping-list-events',
            process.env.RABBIT_EXCHANGE || 'recipemanagement',
            'recipe.updated',
        );

        await this.client['channel'].consume(
            'shopping-list-events',
            this.handleRecipeUpdated.bind(this),
        );
    }
    
    handleRecipeUpdated(message) {
        let recipe = JSON.parse(
            Buffer.from(
                message.content
            ).toString()
        ) as RecipeEvent;

        this.shoppingListService.handleRecipeUpdatedInShoppingLists(recipe.id);

        this.client['channel'].ack(message);
    }

}
