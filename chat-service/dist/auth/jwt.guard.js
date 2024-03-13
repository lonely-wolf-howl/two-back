"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
class JwtAuthGuard {
    canActivate(context) {
        const client = context.switchToWs().getClient();
        const token = client.handshake.query.token;
        if (!token)
            throw new common_1.UnauthorizedException('유효하지 않은 접근입니다.');
        const userId = this.validate(token);
        console.log('userId:', userId);
        const chatRoomId = client.handshake.query.id;
        console.log('chatRoomId:', chatRoomId);
        return true;
    }
    validate(token) {
        const secret = process.env.JWT_SECRET;
        const payload = jwt.verify(token, secret);
        return payload.sub;
    }
}
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt.guard.js.map