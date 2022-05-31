import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Campo utilizado para atribuir um código para o produto',
    example: 'P0000001',
    maxLength: 8,
    required: true,
  })
  @IsNotEmpty({ message: 'O código do produto não pode ser nulo' })
  @MaxLength(8, {
    message: 'O código do produto pode ter no máximo 8 caracteres',
  })
  code: string;

  @ApiProperty({
    description: 'Campo utilizado para o nome do produto',
    example: 'Celular',
    maxLength: 250,
    required: true,
  })
  @IsNotEmpty({ message: 'O nome do produto não pode ser nulo' })
  @MaxLength(250, {
    message: 'O nome do produto pode ter no máximo 250 caracteres',
  })
  name: string;

  @ApiProperty({
    description: 'Campo utilizado para atribuir o preço para o produto',
    example: 8.5,
    required: true,
  })
  @IsNotEmpty({ message: 'O preço do produto não pode ser nulo' })
  price: number;

  @ApiProperty({
    description: 'Campo utilizado para os detalhes do produto',
    example: 'Celular Motorola V8, com camera VGA...',
    required: true,
  })
  @IsNotEmpty({ message: 'O detalhe do produto não pode ser nulo' })
  details: string;

  @ApiProperty({
    description: 'Campo utilizado para atribuir a categoria do produto',
    example: 1,
    required: true,
  })
  @IsNotEmpty({ message: 'A ID da categoria não pode ser nulo' })
  categoryId: number;
}
