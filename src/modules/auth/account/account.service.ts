import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreateAccountDto } from './dto/create.dto';
import { hash } from 'argon2';
import { UpdateDto } from '@/src/modules/auth/account/dto/update.dto';

@Injectable()
export class AccountService {
  public constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAccountDto) {
    const { email, password, name, surname, patronymic } = dto;

    const isEmailExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (isEmailExists) {
      throw new ConflictException('Эта почта уже используется');
    }

    const studentRole = await this.prismaService.role.findUnique({
      where: { key: 'student' }, // или используйте id, если это более удобно
    });

    if (!studentRole) throw new ConflictException('Нету подходящей роли');

    await this.prismaService.user.create({
      data: {
        email,
        password: await hash(password),
        name,
        surname,
        patronymic,
        roles: {
          connect: { id: studentRole.id },
        },
      },
    });

    return true;
  }

  async update(id: string, dto: UpdateDto) {
    if (dto.id !== +id) {
      throw new ConflictException('Пользователь не найден');
    }

    const { email, name, surname, patronymic, rolesId } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { id: +id },
    });

    if (!user) {
      throw new ConflictException('Пользователь не найден');
    }

    const isEmailExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (isEmailExists && user.email !== email) {
      throw new ConflictException('Эта почта уже используется');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: +id },
      include: {
        roles: true,
      },
      data: {
        email,
        name,
        surname,
        patronymic,
        roles: {
          set: rolesId?.map((roleId) => ({ id: roleId })),
        },
      },
    });

    return updatedUser;
  }
}
