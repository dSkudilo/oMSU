import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import {
  getPaging,
  PagingQuery,
} from '@/src/shared/utils/get-pagin-from-query.utils';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { UpdateLessonDto } from '@/src/modules/lesson/dto/update-lesson.dto';
import { IUPS } from '@/src/modules/lesson/types';

@Injectable()
export class LessonService {
  public constructor(private readonly prismaService: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const { name, description } = createLessonDto;
    const createdLesson = await this.prismaService.lesson.create({
      data: {
        name,
        description,
        lessonPackage:
          createLessonDto.lessonPackage?.length > 0
            ? {
                create: createLessonDto.lessonPackage.map((pkg) => ({
                  name: pkg.name,
                  description: pkg.description,
                  lessonUSPTariffPrice:
                    pkg.lessonUSPTariffPrice?.length > 0
                      ? {
                          create: pkg.lessonUSPTariffPrice.map((price) => ({
                            price: price.price,
                            lessonTariff: {
                              connect: { id: price.lessonTariffId },
                            },
                          })),
                        }
                      : undefined,

                  lessonUSPInclude:
                    pkg.lessonUSPInclude?.length > 0
                      ? {
                          create: pkg.lessonUSPInclude.map((usp) => ({
                            has: usp.has,
                            description: usp.description,
                            lessonUps: {
                              connect: { id: usp.lessonUps?.id },
                            },
                          })),
                        }
                      : undefined,
                })),
              }
            : undefined,
      },
    });

    if (!createdLesson) {
      throw new ConflictException('Не удалось создать урок');
    }

    const lesson = this.getLesson(createdLesson.id.toString());
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const { name, description } = updateLessonDto;

    await this.prismaService.$transaction([
      this.prismaService.lesson.update({
        where: { id: +id },
        data: {
          name,
          description,
          lessonPackage: {
            set: updateLessonDto.lessonPackage
              .filter((pkg) => pkg.id)
              .map((pkg) => ({
                id: pkg.id,
              })),
            create: updateLessonDto.lessonPackage
              .filter((pkg) => !pkg.id)
              .map((pkg) => ({
                name: pkg.name,
                description: pkg.description,
                lessonUSPTariffPrice: {
                  create: pkg.lessonUSPTariffPrice?.map((tariff) => ({
                    price: tariff.price,
                    lessonTariffId: tariff.lessonTariffId,
                  })),
                },
                lessonUSPInclude: {
                  create: pkg.lessonUSPInclude?.map((ups) => ({
                    has: ups.has,
                    description: ups.description,
                    lessonUpsId: ups.lessonUps.id,
                  })),
                },
              })),
          },
        },
      }),
      ...updateLessonDto.lessonPackage
        .filter((pkg) => !!pkg.id)
        .map((pkg) =>
          this.prismaService.lessonPackage.update({
            where: { id: pkg.id },
            data: {
              name: pkg.name,
              description: pkg.description,
              lessonUSPTariffPrice: {
                set: pkg.lessonUSPTariffPrice
                  .filter((tariff) => tariff.id)
                  .map((tariff) => ({
                    id: tariff.id,
                  })),
                create: pkg.lessonUSPTariffPrice
                  .filter((tariff) => !tariff.id)
                  .map((tariff) => ({
                    price: tariff.price,
                    lessonTariffId: tariff.lessonTariffId,
                  })),
                update: pkg.lessonUSPTariffPrice
                  .filter((tariff) => tariff.id)
                  .map((tariff) => ({
                    where: { id: tariff.id },
                    data: { price: tariff.price },
                  })),
              },
              lessonUSPInclude: {
                set: pkg.lessonUSPInclude
                  .filter((ups) => ups.id)
                  .map((ups) => ({
                    id: ups.id,
                  })),
                create: pkg.lessonUSPInclude
                  .filter((ups) => !ups.id)
                  .map((ups) => ({
                    has: ups.has,
                    description: ups.description,
                    lessonUpsId: ups.lessonUps.id,
                  })),
                update: pkg.lessonUSPInclude
                  .filter((ups) => ups.id)
                  .map((ups) => ({
                    where: { id: ups.id },
                    data: {
                      has: ups.has,
                      description: ups.description,
                      lessonUpsId: ups.lessonUps.id,
                    },
                  })),
              },
            },
          }),
        ),
    ]);

    return await this.getLesson(id);
  }

  async getLesson(id: string) {
    const lesson = await this.prismaService.lesson.findUnique({
      where: { id: +id },

      select: {
        id: true,
        name: true,
        description: true,
        lessonPackage: {
          select: {
            id: true,
            name: true,
            description: true,
            lessonUSPTariffPrice: {
              orderBy: {
                lessonTariffId: 'asc',
              },
              select: {
                id: true,
                price: true,
                lessonTariffId: true,
              },
            },
            lessonUSPInclude: {
              orderBy: {
                lessonUpsId: 'asc',
              },
              select: {
                id: true,
                has: true,
                description: true,
                lessonUps: {
                  select: {
                    id: true,
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException('Урок с тамик id не найден');
    }
    const lessonUps = lesson.lessonPackage.reduce((acc: IUPS[], e) => {
      e.lessonUSPInclude.forEach((includeUps) => {
        if (!acc.find((a) => a.id === includeUps.lessonUps.id)) {
          acc.push(includeUps.lessonUps);
        }
      });
      return acc;
    }, []);
    return { lesson, lessonUps };
  }

  async getList(query: PagingQuery & { name?: string }) {
    const [lessons, total] = await this.prismaService.$transaction([
      this.prismaService.lesson.findMany({
        where: {
          // name: {
          //   contains: query.name,
          //   mode: 'insensitive',
          // },
        },
        ...getPaging(query),
        orderBy: {
          // name: 'desc',
        },

        select: {
          id: true,
          // name: true,
        },
      }),

      this.prismaService.lesson.count({
        where: {
          // name: {
          //   contains: query.name,
          //   mode: 'insensitive',
          // },
        },
      }),
    ]);

    return {
      list: lessons,
      total,
    };
  }
}
