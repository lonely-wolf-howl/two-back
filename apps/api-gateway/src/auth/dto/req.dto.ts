import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class SignupReqDto {
  @IsString()
  username: string;

  @IsEmail()
  @MaxLength(30)
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,30}$/)
  password: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,30}$/)
  confirm: string;

  gender: Gender;

  @IsNumber()
  birthyear: number;
}

export class SigninReqDto {
  @IsEmail()
  @MaxLength(30)
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,30}$/)
  password: string;
}
