"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chatRoom_entity_1 = require("./entity/chatRoom.entity");
const message_entity_1 = require("./entity/message.entity");
const chats_gateway_1 = require("./chats.gateway");
const chats_controller_1 = require("./chats.controller");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([chatRoom_entity_1.ChatRoom, message_entity_1.Message])],
        controllers: [chats_controller_1.ChatsController],
        providers: [chats_gateway_1.ChatsGateway],
        exports: [chats_gateway_1.ChatsGateway],
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map