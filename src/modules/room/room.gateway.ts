import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '@/src/core/prisma/prisma.service';

@WebSocketGateway({ cors: false })
export class RoomsGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly prisma: PrismaService) {}

  // Присоединение к комнате
  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: number; roomId: number },
  ) {
    // Проверяем существование комнаты
    const room = await this.prisma.room.findUnique({
      where: { id: payload.roomId },
      include: { members: true },
    });

    if (!room) {
      return { error: 'Room not found' };
    }

    // Добавляем пользователя в комнату
    await this.prisma.room.update({
      where: { id: payload.roomId },
      data: {
        members: {
          connect: { id: payload.userId },
        },
      },
    });

    client.join(`room_${payload.roomId}`);
    client.emit('roomJoined', room);

    // Уведомляем остальных участников
    client.to(`room_${payload.roomId}`).emit('userJoined', {
      userId: payload.userId,
      roomId: payload.roomId,
    });

    return room;
  }

  // Отправка сообщения в комнату
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: number; roomId: number; content: string },
  ) {
    // Создаем сообщение в БД
    const message = await this.prisma.message.create({
      data: {
        content: payload.content,
        userId: payload.userId,
        roomId: payload.roomId,
      },
      include: {
        user: true,
        room: true,
      },
    });
    this.server.to(`room_${payload.roomId}`).emit('newMessage', 'message');

    // Отправляем сообщение только в эту комнату
    this.server.to(`room_${payload.roomId}`).emit('newMessage', message);

    return message;
  }

  // Покидание комнаты
  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { userId: number; roomId: number },
  ) {
    client.leave(`room_${payload.roomId}`);
    client.emit('roomLeft', payload);

    // Уведомляем остальных участников
    client.to(`room_${payload.roomId}`).emit('userLeft', {
      userId: payload.userId,
      roomId: payload.roomId,
    });

    return { success: true };
  }
}
