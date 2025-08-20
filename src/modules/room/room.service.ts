import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { CreateRoomDto } from '@/src/modules/room/dto/create-room.dto';
import {
  getPaging,
  PagingQuery,
} from '@/src/shared/utils/get-pagin-from-query.utils';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRoom(dto: CreateRoomDto) {
    await this.prismaService.room.create({
      data: {
        name: dto.name || '',
        members: {
          connect: [...dto.members.map((id) => ({ id }))],
        },
      },
      include: {
        members: true,
      },
    });

    return true;
  }

  async getRoomMessages(roomId: number, pagingQuery: PagingQuery) {
    const [messages, total] = await this.prismaService.$transaction([
      this.prismaService.message.findMany({
        where: { roomId },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              patronymic: true,
              email: true,
              avatar: true,
            },
          },
        },
        ...getPaging(pagingQuery),
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.message.count({
        where: { roomId },
      }),
    ]);

    return {
      list: messages,
      total,
    };
  }

  async getUserRooms(userId: number, pagingQuery: PagingQuery) {
    const [messages, total] = await this.prismaService.$transaction([
      this.prismaService.room.findMany({
        where: {
          members: {
            some: { id: userId },
          },
        },
        ...getPaging(pagingQuery),
        orderBy: { updatedAt: 'desc' },
      }),
      this.prismaService.room.count({
        where: {
          members: {
            some: { id: userId },
          },
        },
      }),
    ]);

    return {
      list: messages,
      total,
    };
  }
}
