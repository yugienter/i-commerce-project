import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { KafkaPayload } from '../kafka/kafka.message';
import { KafkaHostConfig } from '../config/kafka.config';

@Injectable()
export class ProducerService {
  private logger: Logger = new Logger(ProducerService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  async send(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    const payload: KafkaPayload = {
      messageId: '' + new Date().valueOf(),
      body: body,
      messageType: KafkaHostConfig.KAFKA_MESSAGE_TYPE,
      topicName: KafkaHostConfig.KAFKA_TOPIC,
    };

    const value = await this.kafkaService.sendMessage(
      KafkaHostConfig.KAFKA_TOPIC,
      payload,
    );

    this.logger.log('message status: ' + JSON.stringify(value));

    return body;
  }
}
