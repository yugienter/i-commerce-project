export class KafkaHostConfig {
  public static readonly KAFKA_HOST = process.env.KAFKA_HOST || 'localhost';
  public static readonly KAFKA_PORT = process.env.KAFKA_PORT || '9092';
  public static readonly KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'sales-topic';
  public static readonly KAFKA_GROUP_ID =
    process.env.KAFKA_GROUP_ID || 'application-consumer';
  public static readonly KAFKA_CLIENT_ID =
    process.env.KAFKA_CLIENT_ID || 'application-client';
  public static readonly KAFKA_MESSAGE_TYPE = 'Logging';
}
