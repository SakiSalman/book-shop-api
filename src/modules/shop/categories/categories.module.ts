import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCategoriesSchema } from './schema/categories.schema';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';

@Module({
  imports:[
     MongooseModule.forFeature([{ name: 'categories', schema: BookCategoriesSchema }]),
     CloudinaryModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
