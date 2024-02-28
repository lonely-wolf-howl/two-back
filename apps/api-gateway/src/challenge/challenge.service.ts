import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateChallengeRequestDto } from './dto/req.dto';
import { ReadChallengeResponseDto } from './dto/res.dto';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject('CHALLENGE_SERVICE') private client: ClientProxy,
    private userService: UserService,
  ) {}

  async create(userId: string, body: CreateChallengeRequestDto) {
    const { username } = await this.userService.getMe(userId);

    const pattern = { cmd: 'create-challenge' };
    const payload = { userId, username, ...body };
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

  async readAll(page: number, size: number) {
    const pattern = { cmd: 'read-all' };
    const payload = { page, size };
    const challenges = await firstValueFrom<ReadChallengeResponseDto[]>(
      this.client.send<ReadChallengeResponseDto[]>(pattern, payload),
    );
    return challenges;
  }
}
