import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  body: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string
}
