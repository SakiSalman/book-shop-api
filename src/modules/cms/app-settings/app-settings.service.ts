import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AppSettings } from './schema/appSettings.schema';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/responseUtils';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';

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
    // Sanitize DTO to replace "null" strings with actual null
    Object.keys(createAppSettingDto).forEach((key) => {
      if (createAppSettingDto[key] === 'null') {
        createAppSettingDto[key] = null;
      }
    });

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
        console.log('data===', data);
        return ResponseUtils.successResponse(
          201,
          'Updated App Settings.',
          'data',
          data,
        );
      }
      console.log(files?.logo[0]);
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
      console.log(createAppSettingDto);
      let createData = await this.AppSettingsModel.create(createAppSettingDto);

      console.log(createData);
      return createData.save();
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

  findOne(id: number) {
    return `This action returns a #${id} appSetting`;
  }

  update(id: number, updateAppSettingDto: UpdateAppSettingDto) {
    return `This action updates a #${id} appSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} appSetting`;
  }
}
