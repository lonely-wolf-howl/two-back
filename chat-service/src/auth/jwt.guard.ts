import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

export class JwtAuthGuard {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();

    const token = client.handshake.query.token;
    if (!token) throw new UnauthorizedException();
    const userId = this.validate(token);
    console.log('userId:', userId);

    const chatRoomId = client.handshake.query.id;
    console.log('chatRoomId:', chatRoomId);

    return true;
  }

  validate(token: string) {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload.sub;
  }
}
