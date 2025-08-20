import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';

export class CreateRoomDto {
  @IsArray()
  @ArrayNotEmpty({ message: 'Нужно указать участников' })
  @ArrayMinSize(2, { message: 'Необходимо минимум двое участников' })
  @IsNumber({}, { each: true, message: 'Все Id должны быть числами' })
  members: number[];

  name?: string;
}
