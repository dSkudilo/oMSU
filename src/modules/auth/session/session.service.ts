import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { verify } from 'argon2';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async login(req: Request, dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) throw new NotFoundException('Пользователь не найден');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword)
      throw new UnauthorizedException('Введен неверный email или пароль');

    return new Promise((resolve, reject) => {
      req.session.createdAt = new Date();
      req.session.userId = `${user.id}`;

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Не удалось сохранить сессию'),
          );
        }
        resolve({ user });
      });
    });
  }

  async logout(req: Request) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Не удалось завершить сессию'),
          );
        }
        req.res?.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
        resolve(true);
      });
    });
  }
}
