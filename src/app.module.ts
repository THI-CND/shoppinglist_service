import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingListEntity } from './adapters/out/typeorm/entity/shopping-list.entity';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
