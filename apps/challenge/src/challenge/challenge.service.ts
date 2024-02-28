import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './entity/challenge.entity';
import { Goal } from './entity/goal.entity';
import { Challenger } from './entity/challenger.entity';
import { Point } from './enum/enum';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
    @InjectRepository(Challenger)
    private challengerRepository: Repository<Challenger>,
  ) {}

  async createChallenge(payload: CreateChallengeDto) {
    const {
      userId,
      title,
      startDate,
      endDate,
      week,
      limit,
      isPublic,
      description,
      attend,
      weight,
      muscle,
      fat,
    } = payload;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const attendPoint = attend * Point.ATTEND * week;
    const weightPoint = weight * Point.WEIGHT;
    const musclePoint = muscle * Point.MUSCLE;
    const fatPoint = fat * Point.FAT;

    const entryPoint = attendPoint + weightPoint + musclePoint + fatPoint;

    try {
      const challengeEntity = this.challengeRepository.create({
        title,
        startDate: start,
        endDate: end,
        week,
        limit,
        isPublic,
        description,
        entryPoint,
        isStarted: false,
        isDistributed: false,
        userId,
      });
      const challenge = await this.challengeRepository.save(challengeEntity);

      const goalEntity = this.goalRepository.create({
        challenge: { id: challenge.id },
        attend,
        weight,
        muscle,
        fat,
      });
      const goal = await this.goalRepository.save(goalEntity);

      const challengerEntity = this.challengerRepository.create({
        challenge: { id: challenge.id },
        isHost: true,
        isSuccess: false,
        userId,
      });
      const challenger = await this.challengerRepository.save(challengerEntity);

      return {
        challengeId: challenge.id,
        goalId: goal.id,
        hostId: challenger.id,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
