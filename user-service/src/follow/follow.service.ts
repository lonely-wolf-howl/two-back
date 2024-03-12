import { BadRequestException, Injectable } from '@nestjs/common';
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
    const isExist = await this.findFollowMessageByIds(userId, followId);
    if (isExist) throw new BadRequestException('친구 요청을 이미 보냈습니다.');

    const followMessageEntity = this.followMessageRepository.create({
      user: { id: userId },
      followId,
    });
    const followMessage =
      await this.followMessageRepository.save(followMessageEntity);
    return { id: followMessage.id };
  }

  async acceptFollowRequest(userId: string, followerId: string) {
    const followerEntity = this.followerRepository.create({
      user: { id: userId },
      followerId,
    });
    const follower = await this.followerRepository.save(followerEntity);

    const followMessage = await this.findFollowMessageByIds(followerId, userId);
    if (followMessage) {
      await this.followMessageRepository.remove(followMessage);
    }

    return { id: follower.id };
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
}
