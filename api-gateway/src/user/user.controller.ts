import { Controller, Get } from '@nestjs/common';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(@User() user: UserAfterAuth) {
    return this.userService.getMe(user.id);
  }
}
