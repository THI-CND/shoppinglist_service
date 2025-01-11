import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod, RpcException } from "@nestjs/microservices";
import { ShoppingListIdRequest } from "./dto/shopping-list-request.dto";
import { ShoppingListResponse } from "./dto/shopping-list-response.dto";
import { ShoppingListService } from "src/domain/shopping-list.service";

@Controller()
export class ShoppingListServiceGRPCController {

    constructor(
        @Inject('ShoppingListService')
        private readonly shoppingListService: ShoppingListService,
    ) { }

    @GrpcMethod('ShoppingListService', 'UpdateTotalIngredientsInShoppingList')
    async updateTotalIngredientsInShoppingList(request: ShoppingListIdRequest): Promise<ShoppingListResponse> {
        let shoppingList = await this.shoppingListService.updateTotalIngredientsInShoppingList(request.id);

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new RpcException({
            code: 5,
            message: 'Shopping List not found',
        });
    }

}