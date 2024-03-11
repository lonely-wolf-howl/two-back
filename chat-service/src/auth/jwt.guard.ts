import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();

    const token = client.handshake.auth;
    if (!token) throw new UnauthorizedException();
    const payload = this.validate(token);
    console.log(payload);

    const chatRoomId = client.handshake.headers['id'];
    console.log(chatRoomId);

    return true;
  }

  async validate(token: string) {
    const secret = this.configService.get<string>('jwt.secret');
    const payload = this.jwtService.verify(token, { secret });
    return payload;
  }
}
