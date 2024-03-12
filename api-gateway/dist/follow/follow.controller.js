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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../common/decorator/user.decorator");
const follow_service_1 = require("./follow.service");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async createFollowMessage(user, followId) {
        return this.followService.createFollowMessage(user.id, followId);
    }
    async createFollower(user, followerId) {
        return this.followService.createFollower(user.id, followerId);
    }
    async readAllFollowMessage(user) {
        return this.followService.readAllFollowMessage(user.id);
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.Post)('/:followId'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('followId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "createFollowMessage", null);
__decorate([
    (0, common_1.Post)('/:followerId/accept'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('followerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "createFollower", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "readAllFollowMessage", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)('follows'),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map