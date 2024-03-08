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
exports.RecordService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../user/user.service");
const record_cache_1 = require("./cache/record-cache");
let RecordService = class RecordService {
    constructor(client, userService) {
        this.client = client;
        this.userService = userService;
    }
    async create(userId, body) {
        const { gender, birthyear } = await this.userService.getMe(userId);
        const ageRange = this.calculateAgeRange(birthyear);
        const pattern = { cmd: 'create-record' };
        const payload = { userId, gender, birthyear, ...body };
        const { id } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        await record_cache_1.cache.del(`average-${gender}-${ageRange}`);
        return id;
    }
    async readAverage(userId) {
        const { gender, birthyear } = await this.userService.getMe(userId);
        const ageRange = this.calculateAgeRange(birthyear);
        const GET = await record_cache_1.cache.get(`average-${gender}-${ageRange}`);
        if (GET) {
            console.log('AVERAGE CACHE - GET');
            return GET;
        }
        const pattern = { cmd: 'read-average' };
        const payload = { gender, birthyear };
        const { weight, muscle, fat } = await (0, rxjs_1.firstValueFrom)(this.client.send(pattern, payload));
        await record_cache_1.cache.set(`average-${gender}-${ageRange}`, {
            weight,
            muscle,
            fat,
        });
        return { weight, muscle, fat };
    }
    calculateAgeRange(birthyear) {
        const current = new Date();
        const currentyear = current.getFullYear();
        const ageDifference = currentyear - birthyear;
        const ageRange = Math.floor(ageDifference / 10) * 10;
        return ageRange;
    }
};
exports.RecordService = RecordService;
exports.RecordService = RecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('RECORD_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        user_service_1.UserService])
], RecordService);
//# sourceMappingURL=record.service.js.map