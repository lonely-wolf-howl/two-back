import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../common/decorator/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const http = context.switchToHttp();
    const { url, headers } = http.getRequest<Request>();

    const authorization = headers['authorization'];
    if (!authorization) throw new UnauthorizedException();
    if (!authorization.includes('Bearer')) throw new UnauthorizedException();

    const token = /Bearer\s(.+)/.exec(authorization)[1];
    if (!token) throw new UnauthorizedException('access-token is required.');

    const decoded = this.jwtService.decode(token);
    if (url !== '/api/auth/refresh' && decoded['tokenType'] === 'refresh') {
      throw new UnauthorizedException('must use access-token to refresh.');
    }

    return super.canActivate(context);
  }
}
