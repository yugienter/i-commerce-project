import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EsHostConfig } from '../config/es.config';
import { EsService } from './es.service';
import { EsController } from './es.controller';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: EsHostConfig.ES_NODE,
    }),
  ],
  providers: [EsService],
  controllers: [EsController],
  exports: [EsService],
})
export class EsModule {}
