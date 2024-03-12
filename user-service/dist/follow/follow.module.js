"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const follower_entity_1 = require("./entity/follower.entity");
const follow_message_entity_1 = require("./entity/follow-message.entity");
const follow_controller_1 = require("./follow.controller");
const follow_service_1 = require("./follow.service");
let FollowModule = class FollowModule {
};
exports.FollowModule = FollowModule;
exports.FollowModule = FollowModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([follower_entity_1.Follower, follow_message_entity_1.FollowMessage])],
        controllers: [follow_controller_1.FollowController],
        providers: [follow_service_1.FollowService],
        exports: [follow_service_1.FollowService],
    })
], FollowModule);
//# sourceMappingURL=follow.module.js.map