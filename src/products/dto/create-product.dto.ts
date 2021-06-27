import {
  IsNotEmpty,
  IsEnum,
  IsPositive,
  IsString,
  IsNumber,
} from 'class-validator';
import { Brand } from '../../brands/brand.entity';
import { ProductStatus } from '../product-status.enum';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;

  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  brand?: Brand;
}
