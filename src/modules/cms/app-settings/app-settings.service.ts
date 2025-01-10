import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AppSettings } from './schema/appSettings.schema';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/responseUtils';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { sanitizeObject } from 'src/helper/senitizeObjects';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectModel(AppSettings.name)
    private readonly AppSettingsModel: Model<AppSettings>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async create(
    createAppSettingDto: CreateAppSettingDto,
    files: {
      logo?: Express.Multer.File;
    },
  ) {
    createAppSettingDto = sanitizeObject(createAppSettingDto) as CreateAppSettingDto
    try {
      let prevData: any = await this.AppSettingsModel.find();

      if (prevData?.[0]?._id) {
        if (files && files?.logo && files?.logo[0]?.buffer) {
          const imageUploadResult = await this.cloudinaryService.uploadFile(
            files?.logo[0],
          );
          if (imageUploadResult.secure_url) {
            createAppSettingDto.logo = imageUploadResult.secure_url;
          } else {
            throw new BadRequestException('Failed to upload image');
          }
        }
        let data = await this.AppSettingsModel.findOneAndUpdate(
          { _id: prevData[0]._id },
          createAppSettingDto,
          { new: true } 
        );

        if (!data) {
          throw new BadRequestException('Server Error!');
        }
        return ResponseUtils.successResponse(
          201,
          'Updated App Settings.',
          'data',
          data,
        );
      };
      if (files && files?.logo && files?.logo[0]?.buffer) {
        const imageUploadResult = await this.cloudinaryService.uploadFile(
          files?.logo[0],
        );
        if (imageUploadResult.secure_url) {
          createAppSettingDto.logo = imageUploadResult.secure_url;
        } else {
          throw new BadRequestException('Failed to upload image');
        };
      };
      const createData = await this.AppSettingsModel.create(createAppSettingDto);
      await createData.save();
      return ResponseUtils.successResponse(
        201,
        'Data Fetched Successfully.',
        'data',
        createData,
      );
    } catch (error) {
      console.log('error ==', error);
      throw new BadRequestException('Server Error!');
    }
  }

  async findAll() {
    try {
      const settingData = await this.AppSettingsModel.find();

      if (!settingData) {
        throw new BadRequestException('No Data Found!');
      }
      return ResponseUtils.successResponse(
        200,
        'Data Fetched Successfully.',
        'data',
        settingData[0],
      );
    } catch (error) {
      console.log('err===', error);
      throw new BadRequestException('Server Error!');
    }
  }
}
