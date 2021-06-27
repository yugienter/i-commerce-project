export class KafkaPayload {
  public body: any;
  public messageId: string;
  public messageType: string;
  public topicName: string;
  public createdTime?: string;
}

export declare class KafkaConfig {
  clientId: string;
  brokers: string[];
  groupId: string;
}
