import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productRepository.save(createProductDto);
    } catch (e) {
      Error(e);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (e) {
      Error(e);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneBy({ id });
    } catch (e) {
      Error(e);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(id);
      product.name = updateProductDto.name;
      product.detail = updateProductDto.details;
      product.price = updateProductDto.price;
      return await this.productRepository.save(product);
    } catch (e) {
      Error(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch (e) {
      Error(e);
    }
  }
}
