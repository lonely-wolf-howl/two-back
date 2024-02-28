import { Controller } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entity/challenge.entity';

@Controller()
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @MessagePattern({ cmd: 'create-challenge' })
  async create(
    payload: CreateChallengeDto,
  ): Promise<{ challengeId: string; goalId: string; hostId: string }> {
    return await this.challengeService.create(payload);
  }

  @MessagePattern({ cmd: 'read-all' })
  async readAll({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<Challenge[]> {
    return await this.challengeService.readAll(page, size);
  }
}
