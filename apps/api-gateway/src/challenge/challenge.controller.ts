import { Body, Controller, Post } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { CreateChallengeRequestDto } from './dto/req.dto';

@Controller('challenges')
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  @Post()
  async createChallenge(
    @User() user: UserAfterAuth,
    @Body() body: CreateChallengeRequestDto,
  ) {
    return await this.challengeService.createChallenge(user.id, body);
  }
}
