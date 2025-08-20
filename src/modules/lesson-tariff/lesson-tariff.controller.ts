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
import { LessonTariffService } from './lesson-tariff.service';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { PagingQuery } from '@/src/shared/utils/get-pagin-from-query.utils';
import { TariffDto } from '@/src/modules/lesson-tariff/dto/tariff.dto';

@Controller('lesson-tariff')
export class LessonTariffController {
  constructor(private readonly lessonTariffService: LessonTariffService) {}

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Post('create')
  async create(@Body() dto: TariffDto) {
    return await this.lessonTariffService.create(dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: TariffDto) {
    return await this.lessonTariffService.update(id, dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.lessonTariffService.delete(id);
  }

  @Get('list')
  async getList(@Query() pagingQuery: PagingQuery & { name?: string }) {
    return await this.lessonTariffService.getList(pagingQuery);
  }
}
