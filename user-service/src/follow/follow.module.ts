import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entity/follower.entity';
import { FollowMessage } from './entity/follow-message.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follower, FollowMessage])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
