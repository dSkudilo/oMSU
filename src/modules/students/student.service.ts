import { ConflictException, Injectable } from '@nestjs/common';
import { UpdateStudentDto } from '@/src/modules/students/dto/update-student.dto';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import {
  getPaging,
  PagingQuery,
} from '@/src/shared/utils/get-pagin-from-query.utils';

@Injectable()
export class StudentService {
  public constructor(private readonly prismaService: PrismaService) {}

  async updateStudent(id: string, dto: UpdateStudentDto) {
    if (dto.id !== +id) {
      throw new ConflictException('Пользователь не найден');
    }

    const { email, name, surname, patronymic } = dto;

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
      data: {
        email,
        name,
        surname,
        patronymic,
      },
      select: {
        id: true,
        surname: true,
        name: true,
        patronymic: true,
        avatar: true,
        bio: true,
      },
    });

    return updatedUser;
  }

  async getList(query: PagingQuery & { email?: string }) {
    const [students, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where: {
          AND: [
            {
              roles: {
                some: {
                  key: 'student',
                },
              },
            },

            {
              email: {
                contains: query.email,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          surname: true,
          patronymic: true,
          email: true,
        },
        ...getPaging(query),
        orderBy: {
          surname: 'desc',
        },
      }),
      this.prismaService.user.count({
        where: {
          AND: [
            {
              roles: {
                some: {
                  key: 'student',
                },
              },
            },

            {
              email: {
                contains: query.email,
                mode: 'insensitive',
              },
            },
          ],
        },
      }),
    ]);

    return {
      list: students,
      total,
    };
  }
}
