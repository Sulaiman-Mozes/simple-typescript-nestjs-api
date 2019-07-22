import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsServices {

  private products: Product[] = [];

  private findProductById(id: number): { product: Product, index: number } {
    const productIndex = this.products.findIndex(item => item.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException("Invalid Product Id");
    }
    return { product, index: productIndex };
  }

  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(id: number) {
    const { product } = this.findProductById(id);
    return { ...product };
  }

  insertProduct(title: string, description: string, price: number) {
    const lastItem = this.products[this.products.length - 1];
    let id;
    if (!lastItem) {
      id = 1;
    } else {
      id = lastItem.id + 1;
    }
    const product = new Product(id, title, description, price);
    this.products.push(product);
    return { ...product };
  }

  updateProduct(id: number, title: string, description: string, price: number) {
    const { product } = this.findProductById(id);
    const updatedProduct = { ...product };
    product.title = title || updatedProduct.title;
    product.description = description || updatedProduct.description;
    product.price = price || updatedProduct.price;

    return product;
  }

  deleteProduct(id: number) {
    const { index } = this.findProductById(id);
    this.products.splice(index, 1);
    return {
      statusCode: 202,
      msg: 'Product Successfully Deleted'
    }
  }

};
