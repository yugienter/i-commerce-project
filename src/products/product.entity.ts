import { Brand } from '../brands/brand.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from './product-status.enum';
import { BaseDBEntity } from '../common/base.entity';

@Entity()
export class Product extends BaseDBEntity<Product> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: ProductStatus;

  @Column()
  price: number;

  @Column()
  color: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'CASCADE' })
  brand: Brand;
}
