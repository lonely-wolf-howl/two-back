"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../user/user.service");
const refresh_token_entity_1 = require("./entity/refresh-token.entity");
let AuthService = class AuthService {
    constructor(dataSource, userService, jwtService, refreshTokenRepository) {
        this.dataSource = dataSource;
        this.userService = userService;
        this.jwtService = jwtService;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async signup(username, email, password, gender, birthyear) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let error;
        try {
            const userId = await this.userService.findOneByEmail(email);
            if (userId)
                throw new common_1.BadRequestException('user already exists.');
            const newUserId = await this.userService.createUser(email, password);
            const newUserDetailId = await this.userService.createUserDetail(newUserId, username, gender, birthyear);
            const refreshTokenEntity = queryRunner.manager.create(refresh_token_entity_1.RefreshToken, {
                userId: newUserId,
                token: this.genereateRefreshToken(newUserId),
            });
            queryRunner.manager.save(refreshTokenEntity);
            return {
                userId: newUserId,
                userDetailId: newUserDetailId,
            };
            await queryRunner.commitTransaction();
            await queryRunner.release();
        }
        catch (transactionError) {
            error = transactionError;
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
        finally {
            if (error)
                throw error;
        }
    }
    async signin(email, password) {
        const userId = await this.userService.validateUser(email, password);
        const refreshToken = this.genereateRefreshToken(userId);
        await this.updateRefreshTokenEntity(userId, refreshToken);
        return {
            accessToken: this.genereateAccessToken(userId),
            accessTokenExpiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
            refreshToken,
            refreshTokenExpiresIn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        };
    }
    genereateAccessToken(userId) {
        const payload = { sub: userId, tokenType: 'access' };
        return this.jwtService.sign(payload, { expiresIn: '1d' });
    }
    genereateRefreshToken(userId) {
        const payload = { sub: userId, tokenType: 'refresh' };
        return this.jwtService.sign(payload, { expiresIn: '30d' });
    }
    async updateRefreshTokenEntity(userId, refreshToken) {
        let refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
            userId,
        });
        if (refreshTokenEntity) {
            refreshTokenEntity.token = refreshToken;
        }
        else {
            refreshTokenEntity = this.refreshTokenRepository.create({
                userId,
                token: refreshToken,
            });
        }
        await this.refreshTokenRepository.save(refreshTokenEntity);
    }
    async refresh(token, userId) {
        const refreshTokenEntity = await this.refreshTokenRepository.findOneBy({
            token,
        });
        if (!refreshTokenEntity)
            throw new common_1.BadRequestException();
        const accessToken = this.genereateAccessToken(userId);
        const refreshToken = this.genereateRefreshToken(userId);
        refreshTokenEntity.token = refreshToken;
        await this.refreshTokenRepository.save(refreshTokenEntity);
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        user_service_1.UserService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map