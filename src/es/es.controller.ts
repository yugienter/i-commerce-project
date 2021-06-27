import { Controller, Get } from '@nestjs/common';
import { EsService } from './es.service';

@Controller('sales-topic')
export class EsController {
  constructor(private esService: EsService) {}

  @Get()
  search() {
    return this.esService.search();
  }
}
