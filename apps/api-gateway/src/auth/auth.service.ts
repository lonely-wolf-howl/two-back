import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RefreshToken } from './entity/refresh-token.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async saveUserAndGetTokens(
    email: string,
    userName: string,
    providerId: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error;
    try {
      const user: User = await this.userService.saveUser(
        email,
        userName,
        providerId,
      );
      console.log(user);
      console.log(typeof user.id);

      const accessToken = this.genereateAccessToken(user.id);
      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, {
        userId: user.id,
        token: this.genereateRefreshToken(user.id),
      });
      queryRunner.manager.save(refreshTokenEntity);

      await queryRunner.commitTransaction();

      return {
        accessToken,
        refreshToken: refreshTokenEntity.token,
      };
    } catch (transactionError) {
      error = transactionError;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
      if (error) throw error;
    }
  }

  private genereateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private genereateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }
}
