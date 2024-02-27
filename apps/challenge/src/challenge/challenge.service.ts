import { Injectable } from '@nestjs/common';

@Injectable()
export class ChallengeService {
  getHello(): string {
    return 'Hello World!';
  }
}
