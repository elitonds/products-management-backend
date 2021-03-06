import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonPaginatedResult } from 'src/common/common-paginated-result';
import { ILike, Repository } from 'typeorm';
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

  async findAll(
    search = '',
    take = 10,
    skip = 0,
  ): Promise<CommonPaginatedResult> {
    try {
      const products = await this.productRepository.findAndCount({
        take,
        skip,
        order: {
          code: 'ASC',
        },
        where: search.trim() ? { name: ILike(`%${search}%`) } : {},
      });
      if (products && products[0].length) {
        const data = products[0];
        const totalResults = products[1];
        return {
          dataSource: data,
          totalResults: totalResults,
          totalPages: totalResults > take ? Math.ceil(totalResults / take) : 1,
        };
      }
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
      product.details = updateProductDto.details;
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
      const products = await this.productRepository
        .createQueryBuilder('p')
        .select(['p.id', 'p.name', 'p.price', 'p.detail'])
        .where('p.category_id = :categoryId')
        .setParameters({ categoryId: id })
        .getMany();
      return products;
    } catch (e) {
      throw new Error(e);
    }
  }
}
