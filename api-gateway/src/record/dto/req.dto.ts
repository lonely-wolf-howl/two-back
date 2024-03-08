import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateRecordRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  muscle: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  fat: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  kcal: number;
}
