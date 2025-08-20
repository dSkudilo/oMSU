import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty()
  id: number;

  @IsString({ message: 'Ваша почта должна быть строкой' })
  @IsNotEmpty({ message: 'Почта обязательное поле для заполнения' })
  @IsEmail({}, { message: 'Некорректный формат электронной почты' })
  email: string;

  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательное поле для заполнения' })
  @MaxLength(40, { message: 'Имя не должно превышать 40 символов' })
  name: string;

  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия обязательное поле для заполнения' })
  @MaxLength(40, { message: 'Фамилия не должна превышать 40 символов' })
  surname: string;

  @IsString({ message: 'Отчество должно быть строкой' })
  @MaxLength(40, { message: 'Отчество не должно превышать 40 символов' })
  patronymic: string;
}
