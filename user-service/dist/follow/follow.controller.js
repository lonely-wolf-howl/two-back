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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const follow_service_1 = require("./follow.service");
const microservices_1 = require("@nestjs/microservices");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async createFollowMessage({ userId, followId, }) {
        return await this.followService.createFollowMessage(userId, followId);
    }
    async acceptFollowRequest({ userId, followerId, }) {
        return await this.followService.acceptFollowRequest(userId, followerId);
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-follow-message' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "createFollowMessage", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'accept-follow-request' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "acceptFollowRequest", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map