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
import { LessonSubjectService } from './lesson-subject.service';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { CreateSubjectDto } from '@/src/modules/lesson-subject/dto/create.dto';
import { PagingQuery } from '@/src/shared/utils/get-pagin-from-query.utils';

@Controller('lesson-subject')
export class LessonSubjectController {
  constructor(private readonly lessonSubjectService: LessonSubjectService) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() dto: CreateSubjectDto) {
    return await this.lessonSubjectService.create(dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: CreateSubjectDto) {
    return await this.lessonSubjectService.update(id, dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.lessonSubjectService.delete(id);
  }

  @Get('list')
  async getList(@Query() pagingQuery: PagingQuery & { name?: string }) {
    return await this.lessonSubjectService.getList(pagingQuery);
  }
}
