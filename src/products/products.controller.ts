import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RequestInterceptor } from '../interceptors/request.interceptor';
import { BrandsService } from '../brands/brands.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ProductsFilterCriteria,
  ProductsFilterDto,
} from './dto/products-filter.dto';
import { RetrieveProductDto } from './dto/retrieve-product.dto';
import { BrandIdValidationPipe } from './pipes/brandId-validation.pipe';
import { ProductsFilterValidationPipe } from './pipes/products-filter-validation.pipe';
import { ProductsService } from './products.service';

@Controller('products')
@UseInterceptors(RequestInterceptor)
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private brandsService: BrandsService,
  ) {}

  @Get()
  async getAllProducts(): Promise<RetrieveProductDto[]> {
    const products = await this.productsService.getAllProducts();
    return products.map((product) => plainToClass(RetrieveProductDto, product));
  }

  @Get('/search')
  async searchProducts(
    @Query(new ProductsFilterValidationPipe()) pattern: ProductsFilterDto,
  ): Promise<RetrieveProductDto[]> {
    const { criterion, value } = pattern;
    if (criterion === ProductsFilterCriteria.BRAND) {
      return await this.brandsService.getAllProductsByBrandName(value);
    }
    const products = await this.productsService.getAllProductsByPropertyValue(
      pattern,
    );
    return products.map((product) => plainToClass(RetrieveProductDto, product));
  }

  @Get('/:id')
  async getProductById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RetrieveProductDto> {
    const product = await this.productsService.getProductById(id);
    return plainToClass(RetrieveProductDto, product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.productsService.deleteProductById(id);
  }

  @Post()
  async createProduct(
    @Body(BrandIdValidationPipe) product: CreateProductDto,
  ): Promise<RetrieveProductDto> {
    const entity = await this.productsService.createProduct(product);
    return plainToClass(RetrieveProductDto, entity);
  }
}
