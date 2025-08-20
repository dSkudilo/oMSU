import { Module } from '@nestjs/common';
import { RoomsService } from '@/src/modules/room/room.service';
import { RoomsGateway } from '@/src/modules/room/room.gateway';

@Module({
  controllers: [],
  providers: [RoomsService, RoomsGateway],
})
export class RoomModule {}
