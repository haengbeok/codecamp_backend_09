import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService) {}

  @Get('/products/buy')
  buyProduct(): string {
    return this.appService.getHello();
  }
}
