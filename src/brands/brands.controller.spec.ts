import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProducerService } from '../producer/producer.service';
import { Brand } from './brand.entity';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';

describe('BrandsController', () => {
  let controller: BrandsController;
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandsController],
      providers: [
        BrandsService,
        ProducerService,
        {
          provide: getRepositoryToken(Brand),
          useValue: {},
        },
        {
          provide: ProducerService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<BrandsController>(BrandsController);
    service = module.get<BrandsService>(BrandsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Get brand', () => {
    const id = 1000;

    it('should return an object of brand entity', async () => {
      const brand = new Brand();
      brand.id = id;

      jest.spyOn(service, 'getBrandById').mockResolvedValue(brand);
      await expect(controller.getBrandById(id)).resolves.toBe(brand);
      expect(service.getBrandById).toHaveBeenCalledWith(id);
    });
  });

  describe('Create brand', () => {
    it('should return an object of brand entity as saved entity', async () => {
      const name = 'name';
      const address = 'address';
      const brand = new Brand();
      brand.name = name;
      brand.address = address;
      const createBrandDto = new CreateBrandDto();
      createBrandDto.name = name;
      createBrandDto.address = address;

      jest.spyOn(service, 'createBrand').mockResolvedValue(brand);
      await expect(controller.createBrand(createBrandDto)).resolves.toBe(brand);
      expect(service.createBrand).toHaveBeenCalledWith(createBrandDto);
    });
  });

  describe('Delete brand', () => {
    const id = 1000;

    it('should delete brand successfully', async () => {
      jest.spyOn(service, 'deleteBrandById').mockResolvedValue(true);
      await expect(controller.deleteBrand(id)).resolves.toBe(true);
      expect(service.deleteBrandById).toHaveBeenCalledWith(id);
    });
  });

  describe('Get all brands', () => {
    it('should return an array of brand entity', async () => {
      const brands = [new Brand()];

      jest.spyOn(service, 'getAllBrands').mockResolvedValue(brands);
      await expect(controller.getAllBrands()).resolves.toBe(brands);
      expect(service.getAllBrands).toHaveBeenCalled();
    });
  });
});
