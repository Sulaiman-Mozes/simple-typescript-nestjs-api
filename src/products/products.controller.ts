import {
  Controller, Post, Get, Patch,
  Delete, Body, Param, BadRequestException
} from '@nestjs/common';
import { ProductsServices } from './products.service';

type completebody = {
  'title': string,
  'description': string,
  'price': number,
}

@Controller('products')
export class ProductsConstroller {

  constructor(private readonly productServices: ProductsServices) { }


  @Post()
  addProduct(@Body() completeBody: {
    'title': string,
    'description': string,
    'price': number,
  }) {
    const { title, description, price } = completeBody;
    return this.productServices.insertProduct(title, description, price);
  }

  @Get()
  getProducts() {
    return this.productServices.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productServices.getSingleProduct(parseInt(prodId));
  }

  @Patch(':id')
  updateProduct(@Param('id') prodId: string, @Body() completeBody: {
    'title': string,
    'description': string,
    'price': number,
  }) {
    const { title, description, price } = completeBody;
    return this.productServices.updateProduct(parseInt(prodId), title, description, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productServices.deleteProduct(parseInt(prodId));
  }
};
