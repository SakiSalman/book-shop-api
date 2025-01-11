import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BookCategories } from './schema/categories.schema';
import { Model } from 'mongoose';
import { sanitizeObject } from 'src/helper/senitizeObjects';
import { createSlug } from 'src/helper/common';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories')
    private readonly BookCategories: Model<BookCategories>,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(
    createCategoryDto: CreateCategoryDto,
    files: {
      icon?: Express.Multer.File;
    },
  ) {
    try {
      createCategoryDto = sanitizeObject(
        createCategoryDto,
      ) as CreateCategoryDto;

      const isExist = await this.BookCategories.findOne({
        name: createCategoryDto.name,
      });
      if (isExist?._id) {
        throw new BadRequestException('Category already exists');
      }

      createCategoryDto.slug = createSlug(createCategoryDto.name);

      if (files && files?.icon?.[0]?.buffer) {
        const imageUploadResult = await this.cloudinaryService.uploadFile(
          files?.icon[0],
        );
        if (imageUploadResult.secure_url) {
          createCategoryDto.icon = imageUploadResult.secure_url;
        } else {
          throw new BadRequestException('Failed to upload image');
        }
      }

      const createData = await this.BookCategories.create(createCategoryDto);
      await createData.save();
      return ResponseUtils.successResponse(
        201,
        'Category created successfully.',
        'data',
        createData,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the category',
      );
    }
  }

  async findAllParentCategories() {
    try {
      const allCategories = await this.BookCategories.find({
        $or: [
          { parentCategory: { $exists: false } }, // Field does not exist
          { parentCategory: null },              // Field is null
          { parentCategory: "" }                 // Field is an empty string
        ]
      });
      let formatedData  = []


      if (allCategories?.length > 0) {
        allCategories.map((item:BookCategories) => {
          formatedData.push({
            label : item.name,
            value : item._id
            
          })
        })
      }

      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        formatedData,
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
  

  async findAll() {
    try {
      const allCategories = await this.BookCategories.find();
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        allCategories,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the category',
      );
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.BookCategories.findById(id);
      if (!category) {
        throw new BadRequestException('No category found!');
      }
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        category,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the category',
      );
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, files: {
    icon?: Express.Multer.File;
  },) {
    try {
      const category = await this.BookCategories.findById(id);
      if (!category) {
        throw new BadRequestException('No category found!');
      }
      if (files && files?.icon?.[0]?.buffer) {
        const imageUploadResult = await this.cloudinaryService.uploadFile(
          files?.icon[0],
        );
        if (imageUploadResult.secure_url) {
          updateCategoryDto.icon = imageUploadResult.secure_url;
        } else {
          throw new BadRequestException('Failed to upload image');
        }
      }
      const updatedCategory = await this.BookCategories.findByIdAndUpdate(
        id,
        updateCategoryDto,
        {
          new : true
        }
      );
      return ResponseUtils.successResponse(
        200,
        'Data Updated Successfully.',
        'data',
        updatedCategory,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the category',
      );
    }
  }

  async remove(id: string) {
    try {
      const category = await this.BookCategories.findById(id);
      if (!category) {
        throw new BadRequestException('No category found!');
      }
      const removeCategory = await this.BookCategories.findByIdAndDelete(id);
      return ResponseUtils.successResponse(
        200,
        'Data Deleted Successfully.',
        'data',
        removeCategory,
      );
    } catch (error) {
      console.error('Error in create method:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the category',
      );
    }
  }
}
