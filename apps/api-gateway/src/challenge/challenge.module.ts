import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ChallengeController],
  providers: [
    ChallengeService,
    {
      provide: 'CHALLENGE_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'challenge-service',
            port: 4002,
          },
        });
      },
    },
  ],
  exports: [ChallengeService],
})
export class ChallengeModule {}
