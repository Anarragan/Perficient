import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { SKIP_API_KEY } from './skip-api-key.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const skipApiKey = this.reflector.getAllAndOverride<boolean>(SKIP_API_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipApiKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] || request.headers['X-API-Key'];
    const expectedApiKey = this.configService.get<string>('API_KEY');

    if (apiKey === expectedApiKey) {
      return true;
    }

    throw new UnauthorizedException('Invalid API Key');
  }
}