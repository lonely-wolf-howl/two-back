import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ChallengeController],
  providers: [
    ChallengeService,
    {
      provide: 'CHALLENGE_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 4002,
          },
        });
      },
    },
  ],
  exports: [ChallengeService],
})
export class ChallengeModule {}
