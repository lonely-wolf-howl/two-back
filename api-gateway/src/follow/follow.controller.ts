import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Post('/:followerId/accepts')
  async createFollower(
    @User() user: UserAfterAuth,
    @Param('followerId') followerId: string,
  ) {
    return this.followService.createFollower(user.id, followerId);
  }

  @Get()
  async readAllFollowMessagesToMe(@User() user: UserAfterAuth) {
    return this.followService.readAllFollowMessagesToMe(user.id);
  }

  @Get('friends')
  async readAllFollowers(@User() user: UserAfterAuth) {
    return this.followService.readAllFollowers(user.id);
  }

  @Delete('/:followId/cancel')
  async cancelFollowMessage(
    @User() user: UserAfterAuth,
    @Param('followId') followId: string,
  ) {
    return this.followService.cancelFollowMessage(user.id, followId);
  }

  @Delete('/:followerId/reject')
  async rejectFollowMessage(
    @User() user: UserAfterAuth,
    @Param('followerId') followerId: string,
  ) {
    return this.followService.rejectFollowMessage(user.id, followerId);
  }

  @Delete('/:followerId/friends')
  async deleteFollower(
    @User() user: UserAfterAuth,
    @Param('followerId') followerId: string,
  ) {
    return this.followService.deleteFollower(user.id, followerId);
  }
}
