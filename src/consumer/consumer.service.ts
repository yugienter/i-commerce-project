import { Injectable } from '@nestjs/common';
import { AbstractKafkaConsumer } from '../kafka/kafka.abstract.consumer';
import { SubscribeToGroup } from '../kafka/kafka.decorator';
import { KafkaPayload } from '../kafka/kafka.message';
import { KafkaHostConfig } from '../config/kafka.config';
import { EsService } from '../es/es.service';

@Injectable()
export class ConsumerService extends AbstractKafkaConsumer {
  constructor(private readonly esService: EsService) {
    super();
  }

  protected registerTopic() {
    this.addTopic(KafkaHostConfig.KAFKA_TOPIC);
  }

  @SubscribeToGroup(KafkaHostConfig.KAFKA_TOPIC)
  indexToESNodeAsConsumer(payload: KafkaPayload) {
    return this.esService.index(payload);
  }
}
