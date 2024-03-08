import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RefreshToken } from './entity/refresh-token.entity';
export declare class AuthService {
    private dataSource;
    private userService;
    private jwtService;
    private refreshTokenRepository;
    constructor(dataSource: DataSource, userService: UserService, jwtService: JwtService, refreshTokenRepository: Repository<RefreshToken>);
    signup(username: string, email: string, password: string, gender: string, birthyear: number): Promise<{
        userId: string;
        userDetailId: string;
    }>;
    signin(email: string, password: string): Promise<{
        accessToken: string;
        accessTokenExpiresIn: Date;
        refreshToken: string;
        refreshTokenExpiresIn: Date;
    }>;
    private genereateAccessToken;
    private genereateRefreshToken;
    private updateRefreshTokenEntity;
    refresh(token: string, userId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
