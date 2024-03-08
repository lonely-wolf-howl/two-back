import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RecordController],
  providers: [
    RecordService,
    {
      provide: 'RECORD_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 4003,
          },
        });
      },
    },
  ],
  exports: [RecordService],
})
export class RecordModule {}
