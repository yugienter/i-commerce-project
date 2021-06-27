import { Module } from '@nestjs/common';
import { EsModule } from '../es/es.module';
import { ConsumerService } from './consumer.service';

@Module({
  providers: [ConsumerService],
  imports: [EsModule],
})
export class ConsumerModule {}
