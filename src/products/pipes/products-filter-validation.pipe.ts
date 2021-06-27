import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ProductsFilterCriteria } from '../dto/products-filter.dto';

export class ProductsFilterValidationPipe implements PipeTransform {
  readonly allowedCriteria = [
    ProductsFilterCriteria.BRAND,
    ProductsFilterCriteria.COLOR,
    ProductsFilterCriteria.NAME,
  ];

  transform(filter: any) {
    if (!this.isValidCriterion(filter.criterion)) {
      throw new BadRequestException(`criterion is invalid`);
    }

    if (!filter.value) {
      throw new BadRequestException(`value is empty`);
    }

    return filter;
  }

  private isValidCriterion(criterion: any): boolean {
    const index = this.allowedCriteria.indexOf(criterion);
    return index !== -1;
  }
}
