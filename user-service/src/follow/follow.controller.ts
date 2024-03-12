import { Controller } from '@nestjs/common';
import { FollowService } from './follow.service';
import { MessagePattern } from '@nestjs/microservices';
import { FollowMessage } from './entity/follow-message.entity';

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

  @MessagePattern({ cmd: 'create-follower' })
  async createFollower({
    userId,
    followerId,
  }: {
    userId: string;
    followerId: string;
  }): Promise<{ id: string }> {
    return await this.followService.createFollower(userId, followerId);
  }

  @MessagePattern({ cmd: 'read-all-followe-message' })
  async readAllFollowMessage({
    userId,
  }: {
    userId: string;
  }): Promise<{ followMessages: FollowMessage[] }> {
    return await this.followService.readAllFollowMessage(userId);
  }
}
