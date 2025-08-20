import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from '@/src/modules/room/room.service';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { CreateRoomDto } from '@/src/modules/room/dto/create-room.dto';
import { PagingQuery } from '@/src/shared/utils/get-pagin-from-query.utils';

@Controller('room')
export class RoomController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createLessonDto: CreateRoomDto) {
    return this.roomsService.createRoom(createLessonDto);
  }

  @Get(':id')
  async getMessages(
    @Param('id') id: string,
    @Query() pagingQuery: PagingQuery,
  ) {
    return await this.roomsService.getRoomMessages(+id, pagingQuery);
  }

  @Get('list/:id')
  async getRooms(@Param('id') id: string, @Query() pagingQuery: PagingQuery) {
    return await this.roomsService.getUserRooms(+id, pagingQuery);
  }
}
