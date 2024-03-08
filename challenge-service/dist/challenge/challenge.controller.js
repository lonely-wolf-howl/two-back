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
exports.ChallengeController = void 0;
const common_1 = require("@nestjs/common");
const challenge_service_1 = require("./challenge.service");
const microservices_1 = require("@nestjs/microservices");
const create_challenge_dto_1 = require("./dto/create-challenge.dto");
let ChallengeController = class ChallengeController {
    constructor(challengeService) {
        this.challengeService = challengeService;
    }
    async create(payload) {
        return await this.challengeService.create(payload);
    }
    async readAll({ page, size, }) {
        return await this.challengeService.readAll(page, size);
    }
};
exports.ChallengeController = ChallengeController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-challenge' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_challenge_dto_1.CreateChallengeDto]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'read-all' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChallengeController.prototype, "readAll", null);
exports.ChallengeController = ChallengeController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [challenge_service_1.ChallengeService])
], ChallengeController);
//# sourceMappingURL=challenge.controller.js.map