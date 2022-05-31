import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommonPaginatedResult } from 'src/common/common-paginated-result';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ImportCategoryContentDto } from './dto/create-complete-category.dto';
import { SelectCategoryDto } from './dto/select-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('Category')
@Controller('category')
@UsePipes(ValidationPipe)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllPaginated(
    @Query() { search, take, skip },
  ): Promise<CommonPaginatedResult> {
    return await this.categoryService.findAllPaginated(search, take, skip);
  }

  @Get('/select')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<SelectCategoryDto[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @Post('import-content')
  @HttpCode(HttpStatus.OK)
  async importProductsByCategory(
    @Body() categoryContent: ImportCategoryContentDto,
  ) {
    return await this.categoryService.importCategoryContent(categoryContent);
  }
}
