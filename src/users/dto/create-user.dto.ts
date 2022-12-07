import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

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
  password: string
}
