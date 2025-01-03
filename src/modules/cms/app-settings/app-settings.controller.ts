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
import { AppSettingsService } from './app-settings.service';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/cms/app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 }]))
  create(@Body() createAppSettingDto: CreateAppSettingDto, @UploadedFiles() files:{
      logo?:Express.Multer.File
    }) {
    return this.appSettingsService.create(createAppSettingDto, files);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.appSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppSettingDto: UpdateAppSettingDto,
  ) {
    return this.appSettingsService.update(+id, updateAppSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appSettingsService.remove(+id);
  }
}
