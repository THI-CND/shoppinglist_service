import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListRestV1Controller } from './rest-v1.controller';

describe('ShoppingListRestV1Controller', () => {
  let controller: ShoppingListRestV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListRestV1Controller],
      providers: [
        {
          provide: 'ShoppingListService',
          useValue: {},
        },
      ]
    }).compile();

    controller = module.get<ShoppingListRestV1Controller>(ShoppingListRestV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
