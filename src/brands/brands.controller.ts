import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestInterceptor } from '../interceptors/request.interceptor';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
@UseInterceptors(RequestInterceptor)
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  getBrandById(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandsService.getBrandById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createBrand(@Body() brand: CreateBrandDto): Promise<Brand> {
    return this.brandsService.createBrand(brand);
  }

  @Get()
  getAllBrands(): Promise<Brand[]> {
    return this.brandsService.getAllBrands();
  }

  @Delete('/:id')
  deleteBrand(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.brandsService.deleteBrandById(id);
  }
}
