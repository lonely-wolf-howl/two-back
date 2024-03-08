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
exports.RecordController = void 0;
const common_1 = require("@nestjs/common");
const record_service_1 = require("./record.service");
const user_decorator_1 = require("../common/decorator/user.decorator");
const req_dto_1 = require("./dto/req.dto");
let RecordController = class RecordController {
    constructor(recordService) {
        this.recordService = recordService;
    }
    async create(user, body) {
        return await this.recordService.create(user.id, body);
    }
    async readAverage(user) {
        return await this.recordService.readAverage(user.id);
    }
};
exports.RecordController = RecordController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, req_dto_1.CreateRecordRequestDto]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('average'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecordController.prototype, "readAverage", null);
exports.RecordController = RecordController = __decorate([
    (0, common_1.Controller)('records'),
    __metadata("design:paramtypes", [record_service_1.RecordService])
], RecordController);
//# sourceMappingURL=record.controller.js.map