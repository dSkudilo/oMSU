import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

export function AuthDecorator() {
  return applyDecorators(UseGuards(AuthGuard));
}
