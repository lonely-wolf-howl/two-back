import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowMessage } from './entity/follow-message.entity';
import { Follower } from './entity/follower.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowMessage)
    private readonly followMessageRepository: Repository<FollowMessage>,
    @InjectRepository(Follower)
    private readonly followerRepository: Repository<Follower>,
  ) {}

  async createFollowMessage(userId: string, followId: string) {
    const isExistFollowMessage = await this.findFollowMessageByIds(
      userId,
      followId,
    );
    if (isExistFollowMessage) {
      throw new BadRequestException('친구 요청을 이미 보냈습니다.');
    }

    const isExistFollower = await this.findFollowerByIds(followId, userId);
    if (isExistFollower) {
      throw new BadRequestException('해당 사용자와 이미 친구 관계입니다.');
    }

    const entity = this.followMessageRepository.create({
      user: { id: userId },
      followId,
    });
    const followMessage = await this.followMessageRepository.save(entity);
    return { id: followMessage.id };
  }

  async createFollower(userId: string, followerId: string) {
    const entity = this.followerRepository.create({
      user: { id: userId },
      followerId,
    });
    const follower = await this.followerRepository.save(entity);

    const followMessage = await this.findFollowMessageByIds(followerId, userId);
    if (followMessage) {
      await this.followMessageRepository.remove(followMessage);
    }

    return { id: follower.id };
  }

  async readAllFollowMessagesToMe(userId: string) {
    const followMessages = await this.followMessageRepository.find({
      where: {
        followId: userId,
      },
    });
    return { followMessages };
  }

  async readAllFollowers(userId: string) {
    const followersToMe = await this.followerRepository.find({
      where: {
        user: { id: userId },
      },
    });
    const followersFromMe = await this.followerRepository.find({
      where: {
        followerId: userId,
      },
    });

    const followers = [...followersToMe, ...followersFromMe];
    return { followers };
  }

  async cancelFollowMessage(userId: string, followId: string) {
    const followMessage = await this.findFollowMessageByIds(userId, followId);
    if (!followMessage) {
      throw new NotFoundException('내가 보낸 친구 요청을 찾을 수 없습니다.');
    }

    const result = await this.followMessageRepository.remove(followMessage);
    return { id: result.followId };
  }

  async rejectFollowMessage(userId: string, followerId: string) {
    const followMessage = await this.findFollowMessageByIds(followerId, userId);
    if (!followMessage) {
      throw new NotFoundException('나에게 온 친구 요청을 찾을 수 없습니다.');
    }

    const result = await this.followMessageRepository.remove(followMessage);
    return { id: result.followId };
  }

  async deleteFollower(userId: string, followerId: string) {
    const followerToMe = await this.findFollowerByIds(userId, followerId);
    if (followerToMe) {
      const result = await this.followerRepository.remove(followerToMe);
      return { id: result.followerId };
    }

    const followerFromMe = await this.findFollowerByIds(followerId, userId);
    if (followerFromMe) {
      const result = await this.followerRepository.remove(followerFromMe);
      return { id: result.followerId };
    }
  }

  async findFollowMessageByIds(userId: string, followId: string) {
    const followMessage = await this.followMessageRepository.findOne({
      where: {
        user: { id: userId },
        followId,
      },
    });
    return followMessage;
  }

  async findFollowerByIds(userId: string, followerId: string) {
    const follower = await this.followerRepository.findOne({
      where: {
        user: { id: userId },
        followerId,
      },
    });
    return follower;
  }
}
