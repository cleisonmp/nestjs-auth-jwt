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
  @ApiProperty()
  name: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'mail@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string

  @ApiProperty({
    description: 'User password, minimum 8 characters',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Passwords must contain: at least 1 upper case letter AND 1 lower case letter AND 1 number or special character',
  })
  password: string
}
