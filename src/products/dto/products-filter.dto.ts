export class ProductsFilterDto {
  criterion: ProductsFilterCriteria;
  value: string;
}

export enum ProductsFilterCriteria {
  NAME = 'name',
  COLOR = 'color',
  BRAND = 'brand',
}
