import { Controller } from '@nestjs/common';
import { FollowService } from './follow.service';
import { MessagePattern } from '@nestjs/microservices';
import { FollowMessage } from './entity/follow-message.entity';
import { Follower } from './entity/follower.entity';

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

  @MessagePattern({ cmd: 'read-all-follow-messages-to-me' })
  async readAllFollowMessagesToMe({
    userId,
  }: {
    userId: string;
  }): Promise<{ followMessages: FollowMessage[] }> {
    return await this.followService.readAllFollowMessagesToMe(userId);
  }

  @MessagePattern({ cmd: 'read-all-followers' })
  async readAllFollowers({
    userId,
  }: {
    userId: string;
  }): Promise<{ followers: Follower[] }> {
    return await this.followService.readAllFollowers(userId);
  }

  @MessagePattern({ cmd: 'cancel-follow-message' })
  async cancelFollowMessage({
    userId,
    followId,
  }: {
    userId: string;
    followId: string;
  }): Promise<{ id: string }> {
    return await this.followService.cancelFollowMessage(userId, followId);
  }

  @MessagePattern({ cmd: 'reject-follow-message' })
  async rejectFollowMessage({
    userId,
    followerId,
  }: {
    userId: string;
    followerId: string;
  }): Promise<{ id: string }> {
    return await this.followService.rejectFollowMessage(userId, followerId);
  }

  @MessagePattern({ cmd: 'delete-follower' })
  async deleteFollower({
    userId,
    followerId,
  }: {
    userId: string;
    followerId: string;
  }): Promise<{ id: string }> {
    return await this.followService.deleteFollower(userId, followerId);
  }
}
