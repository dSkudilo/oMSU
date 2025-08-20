import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { UpdateStudentDto } from '@/src/modules/students/dto/update-student.dto';
import { PagingQuery } from '@/src/shared/utils/get-pagin-from-query.utils';

@Controller('student')
export class StudentController {
  constructor(private readonly studentsService: StudentService) {}

  @Roles(['student'])
  @UseGuards(RolesGuard)
  @Patch(':id')
  async updateStudent(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return await this.studentsService.updateStudent(id, dto);
  }

  @Roles(['admin', 'teacher'])
  @UseGuards(RolesGuard)
  @Get('list')
  async getStudentsList(
    @Query() pagingQuery: PagingQuery & { email?: string },
  ) {
    return await this.studentsService.getList(pagingQuery);
  }
}
