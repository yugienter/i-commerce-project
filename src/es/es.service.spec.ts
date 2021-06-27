import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { EsService } from './es.service';

describe('EsService', () => {
  let service: EsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EsService,
        {
          provide: ElasticsearchService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EsService>(EsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
