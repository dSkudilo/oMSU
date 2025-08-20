import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonUspService } from './lesson-usp.service';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { PagingQuery } from '@/src/shared/utils/get-pagin-from-query.utils';
import { UPSDto } from '@/src/modules/lesson-usp/dto/ups.dto';

@Controller('lesson-usp')
export class LessonUspController {
  constructor(private readonly lessonUspService: LessonUspService) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() dto: UPSDto) {
    return await this.lessonUspService.create(dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UPSDto) {
    return await this.lessonUspService.update(id, dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.lessonUspService.delete(id);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Get('list')
  async getList(@Query() pagingQuery: PagingQuery & { name?: string }) {
    return await this.lessonUspService.getList(pagingQuery);
  }
}
