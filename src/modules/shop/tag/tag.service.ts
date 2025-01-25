import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { sanitizeObject } from 'src/helper/senitizeObjects';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookTag } from './schema/tag.schema';
import { createSlug } from 'src/helper/common';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('tags')
    private readonly BookTagModel: Model<BookTag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    try {
      createTagDto = sanitizeObject(createTagDto) as CreateTagDto;

      const isExist = await this.BookTagModel.findOne({
        name: createTagDto.name,
      });

      if (isExist?._id) {
        throw new BadRequestException('Tag already exists');
      }

      createTagDto.slug = createSlug(createTagDto.name);

      const createData = await this.BookTagModel.create(createTagDto);
      await createData.save();
      return ResponseUtils.successResponse(
        201,
        'Tag created successfully.',
        'data',
        createData,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the tag',
      );
    }
  }

  async findAll() {
    try {
      const allCategories = await this.BookTagModel.find();
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        allCategories,
      );
    } catch (error) {
      console.error('Error in Get method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while getting the Tag',
      );
    }
  }

  async findFormattedTags() {
    try {
      const allTags = await this.BookTagModel.find();
      let formattedData = [];
      if (allTags?.length > 0) {
        allTags.map((item: BookTag) => {
          formattedData.push({
            label: item.name,
            value: item._id,
          });
        });
      }

      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        formattedData,
      );
    } catch (error) {
      console.error('Error in findAllParentCategories method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while fetching the categories',
      );
    }
  }

  async findOne(id: string) {
    try {
      const tag = await this.BookTagModel.findById(id);
      if (!tag) {
        throw new BadRequestException('No tag found!');
      }
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        tag,
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

  async update(id: string, updateTagDto: UpdateTagDto) {
    try {
      const tag = await this.BookTagModel.findById(id);
      if (!tag) {
        throw new BadRequestException('No tag found!');
      }
      const updatedTag = await this.BookTagModel.findByIdAndUpdate(
        id,
        updateTagDto,
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
      const tag = await this.BookTagModel.findById(id);
      if (!tag) {
        throw new BadRequestException('No tag found!');
      }
      const removedTag = await this.BookTagModel.findByIdAndDelete(id);
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
        'An unexpected error occurred while removing the tag',
      );
    }
  }
}
