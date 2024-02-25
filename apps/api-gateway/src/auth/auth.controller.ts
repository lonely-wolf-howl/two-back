import {
  Controller,
  Get,
  Headers,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';
import { Request as Req, Response as Res } from 'express';
import { AuthService } from './auth.service';
import { Public } from '../common/decorator/public.decorator';
import { OAuthUser } from '../types/types';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';

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

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.redirect('http://localhost:3000');
  }

  @Post('refresh')
  async refresh(
    @Headers('authorization') authorization,
    @User() user: UserAfterAuth,
  ) {
    const token = /Bearer\s(.+)/.exec(authorization)[1];
    const { accessToken, refreshToken } = await this.authService.refresh(
      token,
      user.id,
    );
    return { accessToken, refreshToken };
  }
}
