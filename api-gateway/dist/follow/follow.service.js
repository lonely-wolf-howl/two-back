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
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../user/user.service");
let FollowService = class FollowService {
    constructor(client, userService) {
        this.client = client;
        this.userService = userService;
    }
    async createFollowMessage(userId, followId) {
        const user = await this.userService.findOneById(followId);
        if (!user)
            throw new common_1.NotFoundException();
        const pattern = { cmd: 'create-follow-message' };
        const payload = { userId, followId };
        const { id } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return id;
    }
    async createFollower(userId, followerId) {
        const follower = await this.userService.findOneById(followerId);
        if (!follower)
            throw new common_1.NotFoundException();
        const pattern = { cmd: 'create-follower' };
        const payload = { userId, followerId };
        const { id } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return id;
    }
    async readAllFollowMessagesToMe(userId) {
        const pattern = { cmd: 'read-all-follow-messages-to-me' };
        const payload = { userId };
        const { followMessages } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return followMessages;
    }
    async readAllFollowers(userId) {
        const pattern = { cmd: 'read-all-followers' };
        const payload = { userId };
        const { followers } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return followers;
    }
    async cancelFollowMessage(userId, followId) {
        const pattern = { cmd: 'cancel-follow-message' };
        const payload = { userId, followId };
        const { id } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return id;
    }
    async rejectFollowMessage(userId, followerId) {
        const pattern = { cmd: 'reject-follow-message' };
        const payload = { userId, followerId };
        const { id } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return id;
    }
    async deleteFollower(userId, followerId) {
        const pattern = { cmd: 'delete-follower' };
        const payload = { userId, followerId };
        const { id } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return id;
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FOLLOW_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        user_service_1.UserService])
], FollowService);
//# sourceMappingURL=follow.service.js.map