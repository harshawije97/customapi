/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'TRAINEE'], {
    message: 'Valid role is required.',
  })
  role: 'INTERN' | 'ENGINEER' | 'TRAINEE';

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateOfBirth?: Date;

  @IsNumber()
  @IsNotEmpty()
  age: number;
}
