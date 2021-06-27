import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../config/jest-mock.config';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductStatus } from './product-status.enum';
import {
  ProductsFilterCriteria,
  ProductsFilterDto,
} from './dto/products-filter.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: MockType<Repository<Product>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('get all products from the repository', async () => {
      repository.find.mockReturnValue([new Product(), new Product()]);

      expect(repository.find).not.toHaveBeenCalled();
      const products = await service.getAllProducts();
      expect(products).toBeInstanceOf(Array);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    const id = 1000;

    it('should find a product', async () => {
      const product = new Product();
      product.id = id;

      repository.findOne.mockReturnValue(product);

      await expect(service.getProductById(id)).resolves.toEqual(product);
      expect(repository.findOne).toHaveBeenCalled();
    });

    it('throws an error as product is not found', async () => {
      repository.findOne.mockReturnValue(null);
      await expect(service.getProductById(id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteProductById', () => {
    const deleteResult = new DeleteResult();
    const id = 1000;

    it('delete a record successfully', async () => {
      deleteResult.affected = 1;
      repository.delete.mockReturnValue(deleteResult);

      expect(repository.delete).not.toHaveBeenCalled();
      await expect(service.deleteProductById(id)).resolves.toBeTruthy();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException', async () => {
      deleteResult.affected = 0;
      repository.delete.mockReturnValue(deleteResult);

      expect(repository.delete).not.toHaveBeenCalled();
      await expect(service.deleteProductById(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('createProduct', () => {
    const name = 'name';
    const color = 'red';
    const status = ProductStatus.AVAILABLE;
    const price = 1000;
    const brandId = 1;
    const createProductDto = new CreateProductDto();
    createProductDto.name = name;
    createProductDto.color = color;
    createProductDto.status = status;
    createProductDto.price = price;
    createProductDto.brandId = brandId;

    it('create a record successfully', async () => {
      repository.save.mockReturnValue(new Product());

      expect(repository.save).not.toHaveBeenCalled();
      await expect(
        service.createProduct(createProductDto),
      ).resolves.not.toBeNull();
      expect(repository.save).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('getAllProductsByPropertyValue', () => {
    it('search products by specific property', async () => {
      repository.find.mockReturnValue([new Product(), new Product()]);
      const pattern = new ProductsFilterDto();
      pattern.criterion = ProductsFilterCriteria.NAME;
      pattern.value = 'product';

      expect(repository.find).not.toHaveBeenCalled();
      const products = await service.getAllProductsByPropertyValue(pattern);
      expect(products).toBeInstanceOf(Array);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
