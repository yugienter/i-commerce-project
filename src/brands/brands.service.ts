import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass, plainToClass } from 'class-transformer';
import { RetrieveProductDto } from '../products/dto/retrieve-product.dto';
import { Like } from 'typeorm';
import { Brand } from './brand.entity';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandRepository)
    private brandRepository: BrandRepository,
  ) {}

  async getAllBrands(): Promise<Brand[]> {
    const brands = await this.brandRepository.find();
    return brands.map((brand) => brand.toJSON());
  }

  async createBrand(brand: CreateBrandDto): Promise<Brand> {
    const entity = new Brand(brand);
    const savedEntity = await this.brandRepository.save(entity);

    return savedEntity.toJSON();
  }

  async getBrandById(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne(id);

    if (!brand) {
      throw new NotFoundException();
    }

    return brand;
  }

  async deleteBrandById(id: number): Promise<boolean> {
    const result = await this.brandRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return true;
  }

  async getAllProductsByBrandName(
    search: string,
  ): Promise<RetrieveProductDto[]> {
    const brands = await this.brandRepository.find({
      relations: ['products'],
      where: {
        name: Like(`%${search}%`),
      },
    });

    const productsArray: RetrieveProductDto[] = [];
    brands.map((brand) => {
      const { products } = brand;
      if (products?.length) {
        products.map((product) => {
          product.brand = classToClass(brand);
          const dto = plainToClass(RetrieveProductDto, product);
          productsArray.push(dto);
        });
      }
    });

    return productsArray;
  }
}
