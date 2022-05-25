import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ExportProductsResponseDTO } from './dto/export/export-products-response.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryRepository.save(createCategoryDto);
    } catch (e) {
      Error(e);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (e) {
      Error(e);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (e) {
      Error(e);
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
      Error(e);
    }
  }

  async remove(id: number) {
    try {
      return await this.categoryRepository.delete(id);
    } catch (e) {
      Error(e);
    }
  }

  async exportProductsByCategoryCode(
    code: string,
  ): Promise<ExportProductsResponseDTO> {
    return null;
  }
}
