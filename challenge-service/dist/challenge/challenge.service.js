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
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const challenge_entity_1 = require("./entity/challenge.entity");
const goal_entity_1 = require("./entity/goal.entity");
const challenger_entity_1 = require("./entity/challenger.entity");
const enum_1 = require("./enum/enum");
let ChallengeService = class ChallengeService {
    constructor(challengeRepository, goalRepository, challengerRepository) {
        this.challengeRepository = challengeRepository;
        this.goalRepository = goalRepository;
        this.challengerRepository = challengerRepository;
    }
    async create(payload) {
        const { userId, username, title, startDate, endDate, week, limit, isPublic, description, attend, weight, muscle, fat, } = payload;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const attendPoint = attend * enum_1.Point.ATTEND * week;
        const weightPoint = weight * enum_1.Point.WEIGHT;
        const musclePoint = muscle * enum_1.Point.MUSCLE;
        const fatPoint = fat * enum_1.Point.FAT;
        const entryPoint = attendPoint + weightPoint + musclePoint + fatPoint;
        const challengeEntity = this.challengeRepository.create({
            host: username,
            title,
            startDate: start,
            endDate: end,
            week,
            limit,
            isPublic,
            description,
            entryPoint,
            userId,
        });
        const challenge = await this.challengeRepository.save(challengeEntity);
        const goalEntity = this.goalRepository.create({
            challenge: { id: challenge.id },
            attend,
            weight,
            muscle,
            fat,
        });
        const goal = await this.goalRepository.save(goalEntity);
        const hostEntity = this.challengerRepository.create({
            challenge: { id: challenge.id },
            isHost: true,
            userId,
        });
        const host = await this.challengerRepository.save(hostEntity);
        if (!challenge || !goal || !host) {
            throw new common_1.NotFoundException('cannot find created challenge | goal | host');
        }
        return {
            challengeId: challenge.id,
            goalId: goal.id,
            hostId: host.id,
        };
    }
    async readAll(page, size) {
        const [challenges, total] = await this.challengeRepository.findAndCount({
            skip: (page - 1) * size,
            take: size,
            order: {
                createdAt: 'DESC',
            },
            relations: ['goal'],
        });
        return { total, challenges };
    }
};
exports.ChallengeService = ChallengeService;
exports.ChallengeService = ChallengeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(challenge_entity_1.Challenge)),
    __param(1, (0, typeorm_2.InjectRepository)(goal_entity_1.Goal)),
    __param(2, (0, typeorm_2.InjectRepository)(challenger_entity_1.Challenger)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], ChallengeService);
//# sourceMappingURL=challenge.service.js.map