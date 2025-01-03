import { Module } from '@nestjs/common';
import { SiteFrontendService } from './site-frontend.service';
import { SiteFrontendController } from './site-frontend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettings, AppSettingsSchema } from '../cms/app-settings/schema/appSettings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppSettings.name, schema: AppSettingsSchema },
    ]),
  ],
  controllers: [SiteFrontendController],
  providers: [SiteFrontendService],
})
export class SiteFrontendModule {}
