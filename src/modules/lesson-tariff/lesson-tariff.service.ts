import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { TariffDto } from '@/src/modules/lesson-tariff/dto/tariff.dto';
import {
  getPaging,
  PagingQuery,
} from '@/src/shared/utils/get-pagin-from-query.utils';

@Injectable()
export class LessonTariffService {
  public constructor(private readonly prismaService: PrismaService) {}

  async create(dto: TariffDto) {
    const { name, description } = dto;
    const tariff = await this.prismaService.lessonTariff.create({
      data: {
        name,
        description,
      },
    });

    return tariff;
  }

  async update(id: string, dto: TariffDto) {
    const { name, description } = dto;

    const tariff = await this.prismaService.lessonTariff.findUnique({
      where: { id: +id },
    });

    if (!tariff) {
      throw new ConflictException('Тариф  не найден!');
    }

    const updatedTariff = await this.prismaService.lessonTariff.update({
      where: { id: +id },
      data: { name, description },
    });
    return updatedTariff;
  }

  async delete(id: string) {
    await this.prismaService.lessonTariff.delete({ where: { id: +id } });
    return true;
  }

  async getList(query: PagingQuery & { name?: string }) {
    const [tariffs, total] = await this.prismaService.$transaction([
      this.prismaService.lessonTariff.findMany({
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
      this.prismaService.lessonTariff.count({
        where: {
          name: {
            contains: query.name,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return {
      list: tariffs,
      total,
    };
  }
}
