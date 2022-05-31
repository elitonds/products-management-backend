import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class ImportCategoryContentDto {
  @ApiProperty({
    description: 'Campo utilizado para atribuir um código para a categoria',
    example: 'CT000001',
    maxLength: 8,
    required: true,
  })
  @IsNotEmpty({ message: 'O código da categoria não pode ser nulo' })
  @MaxLength(8, {
    message: 'O código da categoria pode ter no máximo 8 caracteres',
  })
  code: string;

  @ApiProperty({
    description: 'Campo utilizado para o nome da categoria',
    example: 'Cama, mesa e banho',
    maxLength: 150,
    required: true,
  })
  @MaxLength(150, {
    message: 'O nome da categoria pode ter no máximo 8 caracteres',
  })
  name?: string;

  @ApiProperty({
    description: 'Campo utilizado para os detalhes da categoria',
    example: 'Cama, mesa e banho',
  })
  details?: string;

  @ApiProperty({
    description: 'Produtos de cada categoria',
    example: '{code, name, price, detail}',
  })
  products?: CreateCategoryProductDto[];
}

export class CreateCategoryProductDto {
  code: string;
  name: string;
  price: number;
  detail: string;
  categoryId?: number;
}
