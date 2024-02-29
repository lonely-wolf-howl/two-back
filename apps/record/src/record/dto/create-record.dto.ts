import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  birthyear: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  muscle: number;

  @IsNotEmpty()
  @IsNumber()
  fat: number;

  @IsNotEmpty()
  @IsNumber()
  kcal: number;
}
