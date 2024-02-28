import { Controller } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller()
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @MessagePattern({ cmd: 'createChallenge' })
  async createChallenge(
    payload: CreateChallengeDto,
  ): Promise<{ challengeId: string; goalId: string; hostId: string }> {
    return await this.challengeService.createChallenge(payload);
  }
}
