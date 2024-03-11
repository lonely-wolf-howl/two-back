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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const user_detail_entity_1 = require("./entity/user-detail.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, userDetailRepository) {
        this.userRepository = userRepository;
        this.userDetailRepository = userDetailRepository;
    }
    async getMe(userId) {
        const userDetail = await this.userDetailRepository.findOneBy({
            user: { id: userId },
        });
        if (!userDetail)
            throw new common_1.NotFoundException('cannot find user detail.');
        const result = {
            username: userDetail.username,
            gender: userDetail.gender,
            birthyear: userDetail.birthyear,
        };
        return result;
    }
    async findOneById(userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        return { id: user?.id || null };
    }
    async findOneByEmail(email) {
        const user = await this.userRepository.findOneBy({ email });
        return { id: user?.id || null };
    }
    async createUser(email, password) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const userEntity = this.userRepository.create({
            email,
            password: hash,
        });
        const user = await this.userRepository.save(userEntity);
        return { id: user.id };
    }
    async createUserDetail(userId, username, gender, birthyear) {
        const userDetailEntity = this.userDetailRepository.create({
            user: { id: userId },
            username,
            gender,
            birthyear,
        });
        const userDetail = await this.userDetailRepository.save(userDetailEntity);
        return { id: userDetail.id };
    }
    async validate(email, password) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user)
            throw new common_1.UnauthorizedException();
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new common_1.UnauthorizedException();
        return { id: user.id };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_detail_entity_1.UserDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map