import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListEntity } from './adapters/out/typeorm/entity/shopping-list.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ShoppingListRepositoryImpl } from './adapters/out/typeorm/shopping-list.repository';
import { GrpcRecipeProvider } from './adapters/out/grpc/recipe.provider';
import { ShoppingListEventsImpl } from './adapters/out/rabbimq/shopping-list.events';
import { ShoppingListRestV1Controller } from './adapters/in/rest/rest-v1.controller';
import { ShoppingListServiceImpl } from './application/shopping-list.service';
import { RecipeServiceImpl } from './application/recipe.service';
import { ShoppingListRestV2Controller } from './adapters/in/rest/rest-v2.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5434,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'shoppinglist',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ShoppingListEntity]),
    ClientsModule.register([
      {
        name: 'SHOPPING_LIST_EVENTS',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_URL || 'amqp://localhost:5672'],
        },
      },
      {
        name: 'RECIPE_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.RECIPE_SERVICE_ADDRESS || 'localhost:9090',
          package: 'de.benedikt_schwering.thicnd.stubs',
          protoPath: join(__dirname, 'proto/recipeservice.proto'),
          loader: {
            keepCase: true,
            longs: Number,
          }
        },
      },
    ]),
  ],
  controllers: [
    ShoppingListRestV1Controller,
    ShoppingListRestV2Controller,
  ],
  providers: [
    {
      provide: 'ShoppingListService',
      useClass: ShoppingListServiceImpl,
    },
    {
      provide: 'RecipeService',
      useClass: RecipeServiceImpl,
    },
    {
      provide: 'ShoppingListRepository',
      useClass: ShoppingListRepositoryImpl,
    },
    {
      provide: 'RecipeProvider',
      useClass: GrpcRecipeProvider,
    },
    {
      provide: 'ShoppingListEvents',
      useClass: ShoppingListEventsImpl,
    }
  ],
})
export class AppModule {}
