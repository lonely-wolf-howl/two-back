import { Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { FollowService } from './follow.service';

@Controller('follows')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post('/:followId')
  async createFollowMessage(
    @User() user: UserAfterAuth,
    @Param('followId') followId: string,
  ) {
    return this.followService.createFollowMessage(user.id, followId);
  }

  @Post('/:followerId/accept')
  async createFollower(
    @User() user: UserAfterAuth,
    @Param('followerId') followerId: string,
  ) {
    return this.followService.createFollower(user.id, followerId);
  }

  @Get()
  async readAllFollowMessage(@User() user: UserAfterAuth) {
    return this.followService.readAllFollowMessage(user.id);
  }

  @Get('friends')
  async readAllFollower(@User() user: UserAfterAuth) {
    return this.followService.readAllFollower(user.id);
  }
}
