import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BrandsService } from '../../brands/brands.service';

@Injectable()
export class BrandIdValidationPipe implements PipeTransform<any> {
  constructor(private brandsService: BrandsService) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    try {
      const brand = await this.brandsService.getBrandById(object.brandId);
      value.brand = brand;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new BadRequestException('This brandId does not exist');
      } else {
        throw e;
      }
    }

    return value;
  }

  private toValidate(metatype: Function): boolean { // eslint-disable-line
    const types: Function[] = [String, Boolean, Number, Array, Object]; // eslint-disable-line
    return !types.includes(metatype);
  }
}
