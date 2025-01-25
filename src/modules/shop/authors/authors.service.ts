import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookShopAuthor } from './schema/authors.schema';
import { sanitizeObject } from 'src/helper/senitizeObjects';
import { createSlug } from 'src/helper/common';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class AuthorsService {
  constructor(
        @InjectModel('authors')
        private readonly BookAuthorModel: Model<BookShopAuthor>,
  ){}
  async create(createAuthorDto: CreateAuthorDto) {
       try {
         createAuthorDto = sanitizeObject(createAuthorDto) as CreateAuthorDto;
   
         const isExist = await this.BookAuthorModel.findOne({
           name: createAuthorDto.name,
         });
   
         if (isExist?._id) {
           throw new BadRequestException('Author already exists');
         }
   
         createAuthorDto.slug = createSlug(createAuthorDto.name);
   
         const createData = await this.BookAuthorModel.create(createAuthorDto);
         await createData.save();
         return ResponseUtils.successResponse(
           201,
           'Created successfully.',
           'data',
           createData,
         );
       } catch (error) {
         console.error('Error in create method:', error);
         if (error instanceof BadRequestException) {
           throw error;
         }
         throw new InternalServerErrorException(
           'An unexpected error occurred while creating the author',
         );
       }
  }


  async findAll() {
    try {
      const authors = await this.BookAuthorModel.find();
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        authors,
      );
    } catch (error) {
      console.error('Error in Get method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while getting the author',
      );
    }
  }

  async findOne(id: string) {
    try {
      const author = await this.BookAuthorModel.findById(id);
      if (!author) {
        throw new BadRequestException('No author found!');
      }
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        author,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while getting the tag',
      );
    }
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    try {
      const tag = await this.BookAuthorModel.findById(id);
      if (!tag) {
        throw new BadRequestException('No tag found!');
      }
      const updatedTag = await this.BookAuthorModel.findByIdAndUpdate(
        id,
        updateAuthorDto,
        {
          new: true,
        },
      );
      return ResponseUtils.successResponse(
        200,
        'Data Updated Successfully.',
        'data',
        updatedTag,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the tag',
      );
    }
  }


  async remove(id: string) {
    try {
      const tag = await this.BookAuthorModel.findById(id);
      if (!tag) {
        throw new BadRequestException('No tag found!');
      }
      const removedTag = await this.BookAuthorModel.findByIdAndDelete(id);
      return ResponseUtils.successResponse(
        200,
        'Data Deleted Successfully.',
        'data',
        removedTag,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while removing the author',
      );
    }
  }
}
