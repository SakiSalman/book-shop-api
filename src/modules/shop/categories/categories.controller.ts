import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }]))
  create(@Body() createCategoryDto: CreateCategoryDto,  @UploadedFiles() files:{
        icon?:Express.Multer.File
      }) {
    return this.categoriesService.create(createCategoryDto, files);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }
  @Get('/form-data')
  findAllParentCategories() {
    return this.categoriesService.findAllParentCategories();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }]))
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFiles() files:{
      icon?:Express.Multer.File
    }
  ) {
    return this.categoriesService.update(id, updateCategoryDto, files);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
