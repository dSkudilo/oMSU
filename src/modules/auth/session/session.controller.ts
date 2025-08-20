import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Authorized } from '../../../shared/decorators/authorized.decorator';
import { AuthDecorator } from '../../../shared/decorators/auth.decorator';
import { User } from '@prisma/generated';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('login')
  async login(@Req() req: Request, @Body() dto: LoginDto) {
    return await this.sessionService.login(req, dto);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    return this.sessionService.logout(req);
  }

  @AuthDecorator()
  @Get('me')
  me(
    @Authorized(['email', 'name', 'surname', 'patronymic', 'avatar', 'bio'])
    user: Partial<User>,
  ) {
    return user;
  }
}
