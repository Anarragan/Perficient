import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SKIP_JWT } from './skip-jwt.decorator';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const skipJwt = this.reflector.getAllAndOverride<boolean>(SKIP_JWT, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipJwt) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid JWT token');
    }

    const token = authHeader.substring(7);

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}