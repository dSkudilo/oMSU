import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import {
  getPaging,
  PagingQuery,
} from '@/src/shared/utils/get-pagin-from-query.utils';
import { UPSDto } from '@/src/modules/lesson-usp/dto/ups.dto';

@Injectable()
export class LessonUspService {
  public constructor(private readonly prismaService: PrismaService) {}

  async create(dto: UPSDto) {
    const { name, description } = dto;
    const ups = await this.prismaService.lessonUSP.create({
      data: {
        name,
        description,
      },
    });

    return ups;
  }

  async update(id: string, dto: UPSDto) {
    const { name, description } = dto;

    const ups = await this.prismaService.lessonUSP.findUnique({
      where: { id: +id },
    });
    if (!ups) {
      throw new ConflictException('УТП не найден!');
    }

    const updatedUPS = await this.prismaService.lessonUSP.update({
      where: { id: +id },
      data: { name, description },
    });
    return updatedUPS;
  }

  async delete(id: string) {
    await this.prismaService.lessonUSP.delete({ where: { id: +id } });
    return true;
  }

  async getList(query: PagingQuery & { name?: string }) {
    const [ups, total] = await this.prismaService.$transaction([
      this.prismaService.lessonUSP.findMany({
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
      this.prismaService.lessonUSP.count({
        where: {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      list: ups,
      total,
    };
  }
}
