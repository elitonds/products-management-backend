import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O código da categoria não pode ser nulo' })
  @MaxLength(8, {
    message: 'O código da categoria pode ter no máximo 8 caracteres',
  })
  code: string;

  @IsNotEmpty({ message: 'O nome da categoria não pode ser nulo' })
  @MaxLength(150, {
    message: 'O nome da categoria pode ter no máximo 150 caracteres',
  })
  name: string;

  details?: string;
}
