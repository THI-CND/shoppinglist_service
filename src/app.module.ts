import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListEntity } from './adapters/out/typeorm/entity/shopping-list.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ShoppingListRepositoryImpl } from './adapters/out/typeorm/shopping-list.repository';
import { GrpcRecipeProvider } from './adapters/out/grpc/recipe.provider';
import { ShoppingListEventsImpl } from './adapters/out/rabbimq/shopping-list.events';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: 'password',
      database: 'shoppinglist',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ShoppingListEntity]),
    ClientsModule.register([
      {
        name: 'RECIPE_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: '127.0.0.1:9090',
          package: 'de.benedikt_schwering.thicnd.stubs',
          protoPath: join(__dirname, 'proto/recipeservice.proto'),
          loader: {
            keepCase: true,
            longs: Number,
          }
        },
      },
      {
        name: 'SHOPPING_LIST_EVENTS',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    ShoppingListRepositoryImpl,
    GrpcRecipeProvider,
    ShoppingListEventsImpl,
  ],
})
export class AppModule {}
