import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ImportCategoryContentDto } from './dto/create-complete-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CommonPaginatedResult } from 'src/common/common-paginated-result';

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

  async findAll(take = 10, skip = 0): Promise<CommonPaginatedResult> {
    try {
      const categories = await this.categoryRepository.findAndCount({
        take,
        skip,
        order: {
          code: 'ASC',
        },
      });
      if (categories && categories[0].length) {
        return {
          data: categories[0],
          totalResults: categories[1],
          totalPages: categories[1] > take ? categories[1] % take : 1,
        };
      }
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
      category.details = updateCategoryDto.detail;
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
        : await this.create({ code, name, detail: details });

      const { products } = data;

      if (products?.length) {
        await products.forEach(async (product) => {
          const existentProduct = await this.productExists(product.code);
          if (!existentProduct) {
            try {
              product.categoryId = importCategory.id;
              await this.productRepository.save(product);
            } catch (e) {
              throw new Error(e);
            }
          }
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async productExists(code: string) {
    try {
      const product = await this.productRepository
        .createQueryBuilder('p')
        .select(['p.id'])
        .where('p.code = :code')
        .setParameters({ code })
        .getOne();
      return product;
    } catch (e) {
      throw new Error(e);
    }
  }
}
