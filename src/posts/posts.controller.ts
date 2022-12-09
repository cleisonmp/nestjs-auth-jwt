import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { PostNotFoundError } from '../errors/posts'
import { CreatePostDto, UpdatePostDto } from './dto'
import { PostEntity } from './entities/post.entity'
import { PostsService } from './posts.service'

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  @ApiNotFoundResponse({
    description:
      'Post could not be created because it depends on one or more records that were required but not found. Either userId or categories are wrong.',
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto)
  }

  @Get()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  @ApiNotFoundResponse({
    description: 'Could not find post with id X.',
  })
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id)

    if (!post) {
      throw new PostNotFoundError(id)
    }

    return post
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PostEntity })
  @ApiNotFoundResponse({
    description: 'Could not find post with id X.',
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  @ApiNotFoundResponse({
    description: 'Could not find post with id X.',
  })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id)
  }
}
