import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @ApiProperty({
    description: 'Email address of the user',
    example: 'mail@mail.com',
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords must contain: at least 1 upper case letter AND 1 lower case letter AND 1 number or special character',
  })
  @ApiProperty({
    description:
      'User password, minimum 8 characters and at least 1 upper case letter, 1 lower case letter, 1 number or special character',
    example: 'Password1',
  })
  password: string
}
