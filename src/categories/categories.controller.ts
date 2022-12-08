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
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { CategoryEntity } from './entities/category.entity'
import { CategoriesService } from './categories.service'
import { CategoryNotFoundError } from '../errors/categories'

@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoryEntity })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity, isArray: true })
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse({
    description: 'Could not find category with id X.',
  })
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id)

    if (!category) {
      throw new CategoryNotFoundError(id)
    }

    return category
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CategoryEntity })
  @ApiNotFoundResponse({
    description: 'Could not find category with id X.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiNotFoundResponse({
    description: 'Could not find category with id X.',
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id)
  }
}
