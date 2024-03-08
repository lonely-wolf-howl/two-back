import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { CreateChallengeRequestDto } from './dto/req.dto';
import { PageReqDto } from '../common/dto/req.dto';

@Controller('challenges')
export class ChallengeController {
  constructor(private challengeService: ChallengeService) {}

  @Post()
  async create(
    @User() user: UserAfterAuth,
    @Body() body: CreateChallengeRequestDto,
  ) {
    return await this.challengeService.create(user.id, body);
  }

  @Get()
  async readAll(@Query() { page, size }: PageReqDto) {
    return await this.challengeService.readAll(page, size);
  }
}
