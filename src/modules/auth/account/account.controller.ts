import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create.dto';
import { Roles } from '@/src/shared/decorators/roles.decorator';
import { RolesGuard } from '@/src/shared/guards/roles.guard';
import { UpdateDto } from '@/src/modules/auth/account/dto/update.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create')
  async create(@Body() dto: CreateAccountDto) {
    await this.accountService.create(dto);
  }

  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return await this.accountService.update(id, dto);
  }
}
