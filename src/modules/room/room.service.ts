import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoom(name: string, creatorId: number) {
    return this.prisma.room.create({
      data: {
        name,
        members: {
          connect: { id: creatorId },
        },
      },
      include: {
        members: true,
      },
    });
  }

  async getRoomMessages(roomId: number) {
    return this.prisma.message.findMany({
      where: { roomId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getUserRooms(userId: number) {
    return this.prisma.room.findMany({
      where: {
        members: {
          some: { id: userId },
        },
      },
    });
  }
}
