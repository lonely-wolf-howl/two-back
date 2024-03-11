import { Controller, Get } from '@nestjs/common';

@Controller()
export class ChatsController {
  @Get('ping')
  async pong() {
    return await { message: 'pong' };
  }
}
