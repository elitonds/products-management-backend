import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ImportCategoryContentDto } from './dto/create-complete-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.findOne(id);
      category.name = updateCategoryDto.name;
      category.details = updateCategoryDto.details;
      return await this.categoryRepository.save(category);
    } catch (e) {
      throw new Error(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.categoryRepository.delete(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  async importCategoryContent(data: ImportCategoryContentDto) {
    try {
      const category = await this.categoryRepository.findOneBy({
        code: data.code,
      });
      const { code, name, details } = data;
      const importCategory = category
        ? category
        : await this.create({ code, name, details });

      if (data.products?.length) {
        data.products.forEach(async (product) => {
          product.categoryId = importCategory.id;
          await this.productRepository.save(product);
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
