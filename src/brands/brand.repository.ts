import { EntityRepository, Repository } from 'typeorm';
import { Brand } from './brand.entity';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {}
