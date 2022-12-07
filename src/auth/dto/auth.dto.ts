import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'mail@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string
}
