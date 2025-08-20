import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательное поле для заполнения' })
  name: string;

  @IsString({ message: 'Цвет должен быть строкой' })
  @IsNotEmpty({ message: 'Цвет обязательное поле для заполнения' })
  color: string;
}
