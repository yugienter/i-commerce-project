import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProducerService } from '../producer/producer.service';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  private logger: Logger = new Logger(RequestInterceptor.name);
  constructor(private readonly producerService: ProducerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();

    const req = context.switchToHttp().getRequest();
    const { originalUrl, method, params, query, body } = req;

    const httpRequestObj = {
      originalUrl,
      method,
      params,
      query,
      body,
    };

    this.logger.log(httpRequestObj);

    const isSalesTopicRoute = String(originalUrl).includes('sales-topic');
    method === 'GET' &&
      !isSalesTopicRoute &&
      this.producerService.send(httpRequestObj);

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
