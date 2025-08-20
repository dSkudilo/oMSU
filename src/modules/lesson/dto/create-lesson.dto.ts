import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
} from 'class-validator';

class LessonUSPTariffPriceDto {
  @IsOptional()
  @IsInt({ message: 'ID должен быть числом' })
  id?: number;

  @IsNotEmpty({ message: 'Цена не может быть пустой' })
  @IsInt({ message: 'Цена должна быть числом' })
  price: number;

  @IsNotEmpty({ message: 'ID тарифа не может быть пустым' })
  @IsInt({ message: 'ID тарифа должен быть числом' })
  lessonTariffId: number; // ID тарифа, с которым связывается цена
}

class LessonUps {
  @IsNotEmpty({ message: 'ID не может быть пустым' })
  @IsInt({ message: 'ID должен быть числом' })
  id: number;
}

class LessonUSPIncludeDto {
  @IsOptional()
  @IsInt({ message: 'ID должен быть числом' })
  id?: number;

  @IsNotEmpty({ message: 'Поле "has" не может быть пустым' })
  @IsBoolean({ message: 'Поле "has" должно быть булевым значением' })
  has: boolean;

  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @IsNotEmpty({ message: 'ID связанного LessonUSP не может быть пустым' })
  lessonUps: LessonUps; // ID связанного LessonUSP
}

class LessonPackageDto {
  @IsOptional()
  @IsInt({ message: 'ID должен быть числом' })
  id?: number;

  @IsNotEmpty({ message: 'Необходимо указать кол-во занятий в пакете' })
  @IsInt({ message: 'Необходимо указать кол-во занятий в пакете' })
  numberOfClasses: number;

  @IsNotEmpty({
    message: 'Необходимо указать кол-во переносов занятий в пакете',
  })
  @IsInt({ message: 'Необходимо указать кол-во переносов занятий в пакете' })
  numberOfTransfers: number;

  @IsNotEmpty({ message: 'Название пакета не может быть пустым' })
  @IsString({ message: 'Название пакета должно быть строкой' })
  name: string;

  @IsNotEmpty({ message: 'Описание пакета не может быть пустым' })
  @IsString({ message: 'Описание пакета должно быть строкой' })
  description: string;

  @IsArray()
  @IsOptional()
  lessonUSPTariffPrice?: LessonUSPTariffPriceDto[];

  @IsArray()
  @IsOptional()
  lessonUSPInclude?: LessonUSPIncludeDto[];
}

export class CreateLessonDto {
  @IsNotEmpty({ message: 'Название урока не может быть пустым' })
  @IsString({ message: 'Название урока должно быть строкой' })
  name: string;

  @IsNotEmpty({ message: 'Описание урока не может быть пустым' })
  @IsString({ message: 'Описание урока должно быть строкой' })
  description: string;

  @IsArray()
  lessonPackage: LessonPackageDto[];
}
