import { Controller } from '@nestjs/common';
import { FollowService } from './follow.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class FollowController {
  constructor(private followService: FollowService) {}

  @MessagePattern({ cmd: 'create-follow-message' })
  async createFollowMessage({
    userId,
    followId,
  }: {
    userId: string;
    followId: string;
  }): Promise<{ id: string }> {
    return await this.followService.createFollowMessage(userId, followId);
  }
}
