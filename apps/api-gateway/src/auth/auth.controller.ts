import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './auth.guard';
import { Request as Req, Response as Res } from 'express';

@Controller('auth')
export class AuthController {
  @Get('ping')
  async sayPong(): Promise<string> {
    return 'pong';
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req: Req) {
    console.log(req);
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req: Req, @Response() res: Res) {
    const { user } = req;
    return res.send(user);
  }
}
