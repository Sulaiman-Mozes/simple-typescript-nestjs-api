import { Module } from '@nestjs/common';
import { ProductsConstroller } from './products.controller';
import { ProductsServices } from './products.service';

@Module({
  controllers: [ProductsConstroller],
  providers: [ProductsServices],
})
export class ProductsModule { };