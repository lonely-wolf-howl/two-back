import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(payload: CreateChallengeDto) {
    const {
      userId,
      username,
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

    const challengeEntity = this.challengeRepository.create({
      host: username,
      title,
      startDate: start,
      endDate: end,
      week,
      limit,
      isPublic,
      description,
      entryPoint,
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

    const hostEntity = this.challengerRepository.create({
      challenge: { id: challenge.id },
      isHost: true,
      userId,
    });
    const host = await this.challengerRepository.save(hostEntity);

    if (!challenge || !goal || !host) {
      throw new NotFoundException(
        'cannot find created challenge | goal | host',
      );
    }

    return {
      challengeId: challenge.id,
      goalId: goal.id,
      hostId: host.id,
    };
  }

  async readAll(page: number, size: number) {
    const [challenges, total] = await this.challengeRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: {
        createdAt: 'DESC',
      },
      relations: ['goal'],
    });
    return { total, challenges };
  }
}
