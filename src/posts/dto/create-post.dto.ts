import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Post title',
    example: 'Lorem Ipsum Dolor',
  })
  title: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Post content',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis finibus porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam est tellus, accumsan a hendrerit vel, condimentum vitae sem. Donec id est in lectus efficitur maximus. Nulla dignissim nisi a orci condimentum, sed fermentum elit commodo. Duis bibendum auctor sodales. Curabitur id placerat ex. Donec mollis vehicula viverra. Nam ultricies justo justo, vitae congue dolor pulvinar luctus. Aliquam venenatis sapien eros, nec volutpat justo gravida ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
  })
  body: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Post author id',
    example: '10ea9657-0255-4175-b610-00ea1379b5a8',
  })
  userId: string

  @IsArray()
  @ApiProperty({
    description: 'Array of category ids',
    example: [
      '10ea9657-0255-4175-b610-00ea1379b5a8',
      '10ea9657-0255-4175-b610-00ea1379b5a8',
    ],
  })
  categories: string[]
}
