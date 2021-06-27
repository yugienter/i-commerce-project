import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Brand } from '../../brands/brand.entity';
import { ProductStatus } from '../product-status.enum';

@Exclude()
export class RetrieveProductDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: ProductStatus;

  @Expose()
  price: number;

  @Expose()
  color: string;

  brandId: number;

  @Expose()
  @Type(() => Brand)
  @Transform((brand) => brand?.name || 'no brand', { toClassOnly: true })
  brand: string;
}
