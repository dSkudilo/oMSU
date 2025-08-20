import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.session.userId) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: +req.session.userId },
      include: { roles: true },
    });

    req['user'] = user;

    return true;
  }
}
