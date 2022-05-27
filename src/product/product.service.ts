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
      throw new Error(e);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneBy({ id });
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(id);
      product.name = updateProductDto.name;
      product.detail = updateProductDto.detail;
      product.price = updateProductDto.price;
      return await this.productRepository.save(product);
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async exportProductsByCategory(id: number): Promise<Product[]> {
    try {
      const category = await this.productRepository
        .createQueryBuilder('p')
        .leftJoinAndSelect('p.category', 'c')
        .select(['p.id', 'p.name', 'p.price', 'p.detail'])
        .where('c.id = :category_id')
        .setParameters({ category_id: id })
        .getMany();
      return category;
    } catch (e) {
      throw new Error(e);
    }
  }
}
