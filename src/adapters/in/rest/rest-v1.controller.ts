import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ShoppingListService } from 'src/domain/shopping-list.service';
import { ShoppingListResponse } from './dto/shopping-list-response.dto';
import { ShoppingListCreateRequest, ShoppingListUpdateRequest } from './dto/shopping-list-request.dto';

@Controller('api/v1/shopping-list')
export class ShoppingListRestV1Controller {

    constructor(
        @Inject('ShoppingListService')
        private readonly shoppingListService: ShoppingListService,
    ) { }

    @Get()
    async getShoppingLists(): Promise<ShoppingListResponse[]> {
        let shoppingLists = await this.shoppingListService.getShoppingLists();

        return shoppingLists.map(
            (shoppingList) => {
                return new ShoppingListResponse(shoppingList);
            }
        );
            
    }

    @Get(':id')
    async getShoppingList(@Param('id') id: string): Promise<ShoppingListResponse> {
        let shoppingList = await this.shoppingListService.getShoppingList(id);

        if (shoppingList)
            return ShoppingListResponse.fromShoppingList(shoppingList);

        throw new NotFoundException('Shopping List not found');
    }

    @Post()
    async createShoppingList(@Body() shoppingListRequest: ShoppingListCreateRequest): Promise<ShoppingListResponse> {
        shoppingListRequest = new ShoppingListCreateRequest(shoppingListRequest);

        return ShoppingListResponse.fromShoppingList(
            await this.shoppingListService.createShoppingList(
                shoppingListRequest.toShoppingList()
            )
        );
    }

    @Put(':id')
    async updateShoppingList(@Param('id') id: string, @Body() shoppingListRequest: ShoppingListUpdateRequest): Promise<ShoppingListResponse> {
        shoppingListRequest = new ShoppingListUpdateRequest(shoppingListRequest);

        let existingShoppingList = await this.shoppingListService.getShoppingList(id);

        if (existingShoppingList)
            return ShoppingListResponse.fromShoppingList(
                await this.shoppingListService.updateShoppingList(
                    id,
                    shoppingListRequest.toShoppingList(existingShoppingList)
                )
            );

        throw new NotFoundException('Shopping List not found');
    }

    @Delete(':id')
    async deleteShoppingList(@Param('id') id: string) {
        await this.shoppingListService.deleteShoppingList(id);
    }

}
