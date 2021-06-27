import { Product } from '../products/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseDBEntity } from '../common/base.entity';

@Entity()
export class Brand extends BaseDBEntity<Brand> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
