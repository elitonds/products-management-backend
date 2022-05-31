import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O código do produto não pode ser nulo' })
  @MaxLength(8, {
    message: 'O código do produto pode ter no máximo 8 caracteres',
  })
  code: string;

  @IsNotEmpty({ message: 'O nome do produto não pode ser nulo' })
  @MaxLength(250, {
    message: 'O nome do produto pode ter no máximo 250 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'O preço do produto não pode ser nulo' })
  price: number;

  @IsNotEmpty({ message: 'O detalhe do produto não pode ser nulo' })
  details: string;

  @IsNotEmpty({ message: 'A ID da categoria não pode ser nulo' })
  categoryId: number;
}
