import {
  BadRequestException,
  Controller,
  Post,
  Body,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorator/public.decorator';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(
    @Body()
    { username, email, password, confirm, gender, birthyear }: SignupReqDto,
  ) {
    if (password !== confirm) throw new BadRequestException();
    const { userId, userDetailId } = await this.authService.signup(
      username,
      email,
      password,
      gender,
      birthyear,
    );
    return { userId, userDetailId };
  }

  @Public()
  @Post('signin')
  async signin(@Body() { email, password }: SigninReqDto) {
    return await this.authService.signin(email, password);
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
