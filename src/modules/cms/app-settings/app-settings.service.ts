import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AppSettings } from './schema/auth.schema';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class AppSettingsService {
    constructor(
      @InjectModel(AppSettings.name)
      private readonly AppSettingsModel: Model<AppSettings>,
    ) {}
  async create(createAppSettingDto: CreateAppSettingDto) {
console.log("called ====")
    let prevData:any = await this.AppSettingsModel.find()
console.log(prevData)
    if (prevData?.[0]?._id) {
      let data = await this.AppSettingsModel.findOneAndUpdate({_id : prevData[0]._id}, createAppSettingDto)

      if (!data) {
        throw new BadRequestException('Server Error!');
      }
      return ResponseUtils.successResponse(
        201,
        'Updated App Settings.',
        'data',
        data
      );
    }
    let createData = await this.AppSettingsModel.create(createAppSettingDto);

    console.log(createData)
    return createData.save()
  }

  findAll() {
    return `This action returns all appSettings`;
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
