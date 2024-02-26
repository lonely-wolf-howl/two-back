import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RefreshToken } from './entity/refresh-token.entity';
import { User } from '../user/entity/user.entity';
import { UserDetail } from '../user/entity/user-detail.entity';
import * as bcrypt from 'bcrypt';

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
      const user = await this.userService.findOneByEmail(email);
      if (user) throw new BadRequestException('user already exists.');

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const userEntity = queryRunner.manager.create(User, {
        username,
        email,
        password: hash,
        gender,
        birthyear,
      });
      await queryRunner.manager.save(userEntity);

      const userDetailEntity = queryRunner.manager.create(UserDetail, {
        user: { id: userEntity.id },
        username,
        gender,
        birthyear,
      });
      await queryRunner.manager.save(userDetailEntity);

      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, {
        user: { id: userEntity.id },
        token: this.genereateRefreshToken(userEntity.id),
      });
      queryRunner.manager.save(refreshTokenEntity);

      await queryRunner.commitTransaction();

      return {
        id: userEntity.id,
      };
      await queryRunner.release();
    } catch (transactionError) {
      error = transactionError;
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    } finally {
      if (error) throw error;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const refreshToken = this.genereateRefreshToken(user.id);
    await this.updateRefreshTokenEntity(user.id, refreshToken);

    return {
      accessToken: this.genereateAccessToken(user.id),
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

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    return user;
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
