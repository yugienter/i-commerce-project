import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EsController } from './es.controller';
import { EsService } from './es.service';

describe('EsController', () => {
  let controller: EsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsController],
      providers: [
        EsService,
        {
          provide: ElasticsearchService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EsController>(EsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
