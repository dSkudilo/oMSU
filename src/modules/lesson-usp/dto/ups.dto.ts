import { IsNotEmpty, IsString } from 'class-validator';

export class UPSDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название обязательное поле для заполнения' })
  name: string;

  @IsString({ message: 'Описание должно быть строкой' })
  description: string;
}
