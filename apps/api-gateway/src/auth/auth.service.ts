import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RefreshToken } from './entity/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signup(
    username: string,
    email: string,
    password: string,
    gender: string,
    birthyear: number,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error;
    try {
      const userId = await this.userService.findOneByEmail(email);
      if (userId) throw new BadRequestException('user already exists.');

      const newUserId = await this.userService.createUser(email, password);
      const newUserDetailId = await this.userService.createUserDetail({
        user: { id: userEntity.id },
        username,
        gender,
        birthyear,
      });

      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, {
        userId: newUserId,
        token: this.genereateRefreshToken(newUserId),
      });
      queryRunner.manager.save(refreshTokenEntity);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        userId: newUserId,
        userDetailId: newUserDetailId,
      };
    } catch (transactionError) {
      error = transactionError;
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    } finally {
      if (error) throw error;
    }
  }

  async signin(email: string, password: string) {
    const userId = await this.userService.validateUser(email, password);

    const refreshToken = this.genereateRefreshToken(userId);
    await this.updateRefreshTokenEntity(userId, refreshToken);

    return {
      accessToken: this.genereateAccessToken(userId),
      accessTokenExpiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1d
      refreshToken,
      refreshTokenExpiresIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30d
    };
  }

  private genereateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private genereateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  private async updateRefreshTokenEntity(userId: string, refreshToken: string) {
    let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
      user: { id: userId },
    });
    if (refreshTokenEntity) {
      refreshTokenEntity.token = refreshToken;
    } else {
      refreshTokenEntity = this.refreshTokenRepository.create({
        user: { id: userId },
        token: refreshToken,
      });
    }
    await this.refreshTokenRepository.save(refreshTokenEntity);
  }

  async refresh(token: string, userId: string) {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
      token,
    });
    if (!refreshTokenEntity) throw new BadRequestException();

    const accessToken = this.genereateAccessToken(userId);

    const refreshToken = this.genereateRefreshToken(userId);
    refreshTokenEntity.token = refreshToken;
    await this.refreshTokenRepository.save(refreshTokenEntity);

    return { accessToken, refreshToken };
  }
}
