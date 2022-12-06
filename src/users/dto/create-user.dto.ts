import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty()
  password: string
}
