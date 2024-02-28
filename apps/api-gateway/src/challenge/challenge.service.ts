import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateChallengeRequestDto } from './dto/req.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ChallengeService {
  constructor(@Inject('CHALLENGE_SERVICE') private client: ClientProxy) {}

  async createChallenge(userId: string, body: CreateChallengeRequestDto) {
    const pattern = { cmd: 'createChallenge' };
    const payload = { userId, ...body };
    const { challengeId, goalId, hostId } = await firstValueFrom<{
      challengeId: string;
      goalId: string;
      hostId: string;
    }>(
      this.client.send<{ challengeId: string; goalId: string; hostId: string }>(
        pattern,
        payload,
      ),
    );
    return { challengeId, goalId, hostId };
  }
}
