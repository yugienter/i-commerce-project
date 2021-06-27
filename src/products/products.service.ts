import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsFilterDto } from './dto/products-filter.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async getAllProducts(withBrand = true): Promise<Product[]> {
    const products = await this.productRepository.find(
      withBrand && { relations: ['brand'] },
    );
    return products;
  }

  async getProductById(id: number, withBrand = true): Promise<Product> {
    const product = await this.productRepository.findOne(
      id,
      withBrand && { relations: ['brand'] },
    );

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async deleteProductById(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const entity = new Product(product);
    const savedEntity = await this.productRepository.save(entity);

    return savedEntity.toJSON();
  }

  async getAllProductsByPropertyValue(
    pattern: ProductsFilterDto,
  ): Promise<Product[]> {
    const { criterion, value } = pattern;
    const condition = {};
    condition[criterion] = Like(`%${value}%`);

    const products = await this.productRepository.find({
      relations: ['brand'],
      where: condition,
    });

    return products;
  }
}
