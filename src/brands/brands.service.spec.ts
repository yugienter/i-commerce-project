import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../config/jest-mock.config';
import { DeleteResult, Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';

describe('BrandsService', () => {
  let service: BrandsService;
  let repository: MockType<Repository<Brand>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<BrandsService>(BrandsService);
    repository = module.get(getRepositoryToken(Brand));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getAllBrands', () => {
    it('get all brands from the repository', async () => {
      repository.find.mockReturnValue([new Brand(), new Brand()]);
      expect(repository.find).not.toHaveBeenCalled();
      const brands = await service.getAllBrands();
      expect(brands).toBeInstanceOf(Array);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('getBrandById', () => {
    const id = 1000;

    it('should find a brand', async () => {
      const brand = new Brand();
      brand.id = id;
      repository.findOne.mockReturnValue(brand);
      await expect(service.getBrandById(id)).resolves.toEqual(brand);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });

    it('throws an error as brand is not found', async () => {
      repository.findOne.mockReturnValue(null);
      await expect(service.getBrandById(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createBrand', () => {
    const createBrandDto = new CreateBrandDto();
    createBrandDto.name = 'name';
    createBrandDto.address = 'address';

    it('create a record successfully', async () => {
      repository.save.mockReturnValue(new Brand());

      expect(repository.save).not.toHaveBeenCalled();
      await expect(service.createBrand(createBrandDto)).resolves.not.toBeNull();
      expect(repository.save).toHaveBeenCalledWith(createBrandDto);
    });
  });

  describe('deleteBrandById', () => {
    const deleteResult = new DeleteResult();
    const id = 1000;

    it('delete a record successfully', async () => {
      deleteResult.affected = 1;
      repository.delete.mockReturnValue(deleteResult);

      expect(repository.delete).not.toHaveBeenCalled();
      await expect(service.deleteBrandById(id)).resolves.toBeTruthy();
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException', async () => {
      deleteResult.affected = 0;
      repository.delete.mockReturnValue(deleteResult);

      expect(repository.delete).not.toHaveBeenCalled();
      await expect(service.deleteBrandById(id)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('getAllProductsByBrandName', () => {
    it('get all products that have brand name like value', async () => {
      const value = 'brand';
      repository.find.mockReturnValue([new Brand(), new Brand()]);

      expect(repository.find).not.toHaveBeenCalled();
      const dtos = await service.getAllProductsByBrandName(value);
      expect(dtos).toBeInstanceOf(Array);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
