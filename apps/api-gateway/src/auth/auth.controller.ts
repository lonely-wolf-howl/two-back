import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';
import { Request as Req, Response as Res } from 'express';
import { AuthService } from './auth.service';
import { Public } from './common/decorator/public.decorator';
import { OAuthUser } from './types/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('ping')
  async sayPong(): Promise<string> {
    return 'pong';
  }

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req: Req) {
    console.log(req);
  }

  @Public()
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req: Req, @Response() res: Res) {
    const user: OAuthUser = req.user;
    /*
    {
      email: 'electruc0095@gmail.com',
      username: 'TILLIDIE',
      providerId: '101465919459724295856',
    }
    */

    const tokens = await this.authService.saveUserAndGetTokens(
      user.email,
      user.userName,
      user.providerId,
    );
    console.log(tokens);
    /*
    {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNTNiYzE1OS0yNGQyLTQ0MzUtYTU3YS0wNTJkZjA2NTIzZWUiLCJ0b2tlblR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MDg3Nzc2NTMsImV4cCI6MTcwODg2NDA1M30.patjUKCwhBQzm8M9XYWvBgZprhOeEO2dLlkD2KSjYPw',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNTNiYzE1OS0yNGQyLTQ0MzUtYTU3YS0wNTJkZjA2NTIzZWUiLCJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzA4Nzc3NjUzLCJleHAiOjE3MTEzNjk2NTN9.2U6qiwnekinoi8WBWC5TDyqpyddDLb9NZklUAqJs6gY'
    }
    */

    // res.cookie('accessToken', tokens.accessToken, {
    //   httpOnly: true,
    //   sameSite: 'strict',
    // });
    // res.cookie('refreshToken', tokens.refreshToken, {
    //   httpOnly: true,
    //   sameSite: 'strict',
    // });

    // res.redirect('http://localhost:3000');
  }
}
