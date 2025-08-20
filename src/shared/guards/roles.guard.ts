import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/src/shared/decorators/roles.decorator';
import { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    if (!req.session.userId) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: +req.session.userId },
      select: {
        id: true,
        roles: {
          select: {
            key: true,
          },
        },
      },
    });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const availableRoles = user.roles.map((e) => e.key);
    const roleExist = requiredRoles.some((role) =>
      availableRoles.includes(role),
    );

    if (!roleExist) {
      throw new ForbiddenException(
        'У вас недостаточно прав для доступа к этому ресурсу',
      );
    }

    return true;
  }
}
