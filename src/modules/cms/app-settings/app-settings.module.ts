import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettings, AppSettingsSchema } from './schema/appSettings.schema';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: AppSettings.name, schema: AppSettingsSchema }]),
      CloudinaryModule
    ],
  controllers: [AppSettingsController],
  providers: [AppSettingsService],
})
export class AppSettingsModule {}
