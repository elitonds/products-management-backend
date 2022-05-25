export class ExportProductsResponseDTO {
  category: {
    id: number;
    code: string;
    name: string;
  };
  products: ExportedProduct[];
}

export interface ExportedProduct {
  id: number;
  code: string;
  name: string;
  detail: string;
}
