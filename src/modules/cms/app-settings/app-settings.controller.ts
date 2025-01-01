import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('/cms/app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createAppSettingDto: CreateAppSettingDto) {
    return this.appSettingsService.create(createAppSettingDto);
  }

  @Get()
  findAll() {
    return this.appSettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appSettingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppSettingDto: UpdateAppSettingDto) {
    return this.appSettingsService.update(+id, updateAppSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appSettingsService.remove(+id);
  }
}
