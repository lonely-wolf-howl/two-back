import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from './config/mongo.config';
import sentryConfig from './config/sentry.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, sentryConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongo.uri'),
      }),
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
