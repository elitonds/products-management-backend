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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CommonPaginatedResult } from 'src/common/common-paginated-result';

@Controller('product')
@UsePipes(ValidationPipe)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() { take, skip }): Promise<CommonPaginatedResult> {
    return await this.productService.findAll(take, skip);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: number) {
    return await this.productService.remove(id);
  }

  @Get('export-products/:id')
  @HttpCode(HttpStatus.OK)
  async findProductsByCategory(
    @Param('id') categoryId: number,
  ): Promise<Product[]> {
    return await this.productService.exportProductsByCategory(categoryId);
  }
}
