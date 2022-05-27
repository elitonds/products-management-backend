export interface ImportCategoryContentDto {
  code: string;
  name?: string;
  details?: string;
  products?: CreateCategoryProductDto[];
}

export interface CreateCategoryProductDto {
  code: string;
  name: string;
  price: number;
  detail: string;
  categoryId?: number;
}
