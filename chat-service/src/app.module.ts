import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import jwtConfig from './config/jwt.config';
import mysqlConfig from './config/mysql.config';
import sentryConfig from './config/sentry.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, mysqlConfig, sentryConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let object: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.get('mysql.host'),
          port: configService.get('mysql.port'),
          database: configService.get('mysql.database'),
          username: configService.get('mysql.username'),
          password: configService.get('mysql.password'),
          autoLoadEntities: true,
          synchronize: true,
        };
        if (configService.get('STAGE') === 'LOCAL') {
          object = Object.assign(object, {
            logging: true,
          });
        }
        return object;
      },
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
