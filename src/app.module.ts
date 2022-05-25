import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
