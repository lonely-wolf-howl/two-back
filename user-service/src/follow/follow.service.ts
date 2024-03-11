import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowMessage } from './entity/follow-message.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(FollowMessage)
    private readonly followMessageRepository: Repository<FollowMessage>,
  ) {}

  async createFollowMessage(userId: string, followId: string) {
    const followMessageEntity = this.followMessageRepository.create({
      user: { id: userId },
      followId,
    });
    const followMessage =
      await this.followMessageRepository.save(followMessageEntity);
    return { id: followMessage.id };
  }
}
