import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ChallengeService {
  constructor(@Inject('CHALLENGE_SERVICE') private client: ClientProxy) {}
}
