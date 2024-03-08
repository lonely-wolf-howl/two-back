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
exports.ChallengeService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../user/user.service");
let ChallengeService = class ChallengeService {
    constructor(client, userService) {
        this.client = client;
        this.userService = userService;
    }
    async create(userId, body) {
        const { username } = await this.userService.getMe(userId);
        const pattern = { cmd: 'create-challenge' };
        const payload = { userId, username, ...body };
        const { challengeId, goalId, hostId } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return { challengeId, goalId, hostId };
    }
    async readAll(page, size) {
        const pattern = { cmd: 'read-all' };
        const payload = { page, size };
        const { total, challenges } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        return { total, challenges };
    }
};
exports.ChallengeService = ChallengeService;
exports.ChallengeService = ChallengeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CHALLENGE_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        user_service_1.UserService])
], ChallengeService);
//# sourceMappingURL=challenge.service.js.map