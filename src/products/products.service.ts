import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from "uuid";

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
     productId: uuid(),
     productName: "Sabritas Naturales 48g",
     price: 29,
     countSeal: 3,
     provider: uuid(),
    },
    {
      productId: uuid(),
     productName: "CocaCola 600ml",
     price: 20,
     countSeal: 2,
     provider: uuid(),
    },
    {
      productId: uuid(),
     productName: "Agua Bonafont 1L",
     price: 15,
     countSeal: 2,
     provider: uuid(),
    }

  ]
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.productId === id)[0];
    if(!productFound) throw new NotFoundException();
    return productFound;

  }

  findByProvider(id: string){
    const productsFound = this.products.filter((product)=> product.provider === id);
    if(!productsFound) throw new NotFoundException();
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    product = {
      ...product,
      ...updateProductDto,
    }
    return product;
  }

  remove(id: string) {
    const removeProduct = this.findOne(id);
    this.products = this.products.filter((product) =>product.productId != removeProduct.productId);
    return this.products;
  }
}
