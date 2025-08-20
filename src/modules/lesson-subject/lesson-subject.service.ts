import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from '@/src/modules/lesson-subject/dto/create.dto';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import {
  getPaging,
  PagingQuery,
} from '@/src/shared/utils/get-pagin-from-query.utils';

@Injectable()
export class LessonSubjectService {
  public constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSubjectDto) {
    const { name, color } = dto;
    const subject = await this.prismaService.lessonSubject.create({
      data: {
        name,
        color,
      },
    });

    return subject;
  }

  async update(id: string, dto: CreateSubjectDto) {
    const { name, color } = dto;

    const subject = await this.prismaService.lessonSubject.findUnique({
      where: { id: +id },
    });

    if (!subject) {
      throw new ConflictException('Предмет не найден!');
    }

    const updatedSubject = await this.prismaService.lessonSubject.update({
      where: { id: +id },
      data: { name, color },
    });
    return updatedSubject;
  }

  async delete(id: string) {
    await this.prismaService.lessonSubject.delete({ where: { id: +id } });
    return true;
  }

  async getList(query: PagingQuery & { name?: string }) {
    const [subjects, total] = await this.prismaService.$transaction([
      this.prismaService.lessonSubject.findMany({
        where: {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
        },
        ...getPaging(query),
        orderBy: {
          name: 'desc',
        },
      }),
      this.prismaService.lessonSubject.count({
        where: {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      list: subjects,
      total,
    };
  }
}
