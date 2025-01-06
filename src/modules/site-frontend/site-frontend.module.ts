import { Module } from '@nestjs/common';
import { SiteFrontendService } from './site-frontend.service';
import { SiteFrontendController } from './site-frontend.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppSettings, AppSettingsSchema } from '../cms/app-settings/schema/appSettings.schema';
import {HeaderFooterSchema } from '../cms/header-footer/schema/header-footer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppSettings.name, schema: AppSettingsSchema },
      { name: 'header-footer-cms', schema: HeaderFooterSchema },
    ]),
  ],
  controllers: [SiteFrontendController],
  providers: [SiteFrontendService],
})
export class SiteFrontendModule {}
