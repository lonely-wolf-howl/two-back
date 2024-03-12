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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const follow_message_entity_1 = require("./entity/follow-message.entity");
const follower_entity_1 = require("./entity/follower.entity");
let FollowService = class FollowService {
    constructor(followMessageRepository, followerRepository) {
        this.followMessageRepository = followMessageRepository;
        this.followerRepository = followerRepository;
    }
    async createFollowMessage(userId, followId) {
        const isExistFollowMessage = await this.findFollowMessageByIds(userId, followId);
        if (isExistFollowMessage) {
            throw new common_1.BadRequestException('친구 요청을 이미 보냈습니다.');
        }
        const isExistFollower = await this.findFollowerByIds(followId, userId);
        if (isExistFollower) {
            throw new common_1.BadRequestException('해당 사용자와 이미 친구 관계입니다.');
        }
        const entity = this.followMessageRepository.create({
            user: { id: userId },
            followId,
        });
        const followMessage = await this.followMessageRepository.save(entity);
        return { id: followMessage.id };
    }
    async createFollower(userId, followerId) {
        const entity = this.followerRepository.create({
            user: { id: userId },
            followerId,
        });
        const follower = await this.followerRepository.save(entity);
        const followMessage = await this.findFollowMessageByIds(followerId, userId);
        if (followMessage) {
            await this.followMessageRepository.remove(followMessage);
        }
        return { id: follower.id };
    }
    async readAllFollowMessage(userId) {
        const followMessages = await this.followMessageRepository.find({
            where: {
                followId: userId,
            },
        });
        return { followMessages };
    }
    async findFollowMessageByIds(userId, followId) {
        const followMessage = await this.followMessageRepository.findOne({
            where: {
                user: { id: userId },
                followId,
            },
        });
        return followMessage;
    }
    async findFollowerByIds(userId, followerId) {
        const follower = await this.followerRepository.findOne({
            where: {
                user: { id: userId },
                followerId,
            },
        });
        return follower;
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follow_message_entity_1.FollowMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(follower_entity_1.Follower)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FollowService);
//# sourceMappingURL=follow.service.js.map