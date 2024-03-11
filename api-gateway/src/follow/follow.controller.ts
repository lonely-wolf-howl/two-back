import { Controller, Param, Post } from '@nestjs/common';
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
}
