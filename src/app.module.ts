import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { KafkaModule } from './kafka/kafka.module';
import { ConsumerModule } from './consumer/consumer.module';
import { KafkaHostConfig } from './config/kafka.config';
import { ProducerModule } from './producer/producer.module';
import { EsModule } from './es/es.module';

@Module({
  imports: [
    KafkaModule.register({
      clientId: KafkaHostConfig.KAFKA_CLIENT_ID,
      brokers: [`${KafkaHostConfig.KAFKA_HOST}:${KafkaHostConfig.KAFKA_PORT}`],
      groupId: KafkaHostConfig.KAFKA_GROUP_ID,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BrandsModule,
    ProductsModule,
    ConsumerModule,
    ProducerModule,
    EsModule,
  ],
})
export class AppModule {}
