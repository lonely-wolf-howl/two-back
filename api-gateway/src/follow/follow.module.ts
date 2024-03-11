import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [FollowController],
  providers: [
    FollowService,
    {
      provide: 'FOLLOW_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 4001,
          },
        });
      },
    },
  ],
  exports: [FollowService],
})
export class FollowModule {}
