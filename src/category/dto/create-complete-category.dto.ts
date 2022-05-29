import { IsNotEmpty, MaxLength } from 'class-validator';

export class ImportCategoryContentDto {
  @IsNotEmpty({ message: 'O código da categoria não pode ser nulo' })
  @MaxLength(8, {
    message: 'O código da categoria pode ter no máximo 8 caracteres',
  })
  code: string;

  @MaxLength(150, {
    message: 'O nome da categoria pode ter no máximo 8 caracteres',
  })
  name?: string;

  details?: string;

  products?: CreateCategoryProductDto[];
}

export class CreateCategoryProductDto {
  code: string;
  name: string;
  price: number;
  detail: string;
  categoryId?: number;
}
