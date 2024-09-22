import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor( 
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
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
    
    const product = this.productRepository.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productRepository.find;
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({
      productId: id,
    })
  }

  findByProvider(id: string){
    const productsFound = this.products.filter((product)=> product.provider === id);
    if(productsFound.length === 0) throw new NotFoundException();
    return productsFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    })
    if(!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate);
    return productToUpdate;
   
  }

   remove(id: string) {
    return this.productRepository.delete({
      productId: id,
    })
  }
}
