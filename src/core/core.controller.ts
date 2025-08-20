import { Controller, Get } from '@nestjs/common';

@Controller()
export class CoreController {
  @Get()
  getHello(): string {
    return 'hi';
  }
}
