import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { PagingQuery } from '@/src/shared/utils/get-pagin-from-query.utils';
import { UpdateLessonDto } from '@/src/modules/lesson/dto/update-lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() createLessonDto: UpdateLessonDto) {
    return this.lessonService.update(id, createLessonDto);
  }

  @Get('list')
  async getList(@Query() pagingQuery: PagingQuery & { name?: string }) {
    return await this.lessonService.getList(pagingQuery);
  }

  @Get(':id')
  async getLesson(@Param('id') id: string) {
    return await this.lessonService.getLesson(id);
  }
}
