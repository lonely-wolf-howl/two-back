import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entity/challenge.entity';
import { Goal } from './entity/goal.entity';
import { Challenger } from './entity/challenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge, Goal, Challenger])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
