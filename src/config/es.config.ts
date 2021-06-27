export class EsHostConfig {
  private static readonly ES_HOST = process.env.ES_HOST || 'localhost';
  private static readonly ES_PORT = process.env.ES_PORT || '9200';
  public static readonly ES_NODE = `http://${EsHostConfig.ES_HOST}:${EsHostConfig.ES_PORT}`;
  public static readonly ES_INDEX = process.env.ES_INDEX || 'sales-topic';
}
