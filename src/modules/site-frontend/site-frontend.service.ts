import { Injectable } from '@nestjs/common';
import { AppSettings } from '../cms/app-settings/schema/appSettings.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseUtils } from 'src/utils/responseUtils';
import { HeaderFooterCMS } from '../cms/header-footer/schema/header-footer.schema';

@Injectable()
export class SiteFrontendService {
  constructor(
    @InjectModel(AppSettings.name)
    private readonly appSettingsModel: Model<AppSettings>,
    @InjectModel("header-footer-cms")
    private readonly headerFooterCMSModel: Model<HeaderFooterCMS>,
  ) {}

  async getHeaderFooterCMS() {
    try {
      const [headerFooterData, HeaderFooterCMS] = await Promise.all([
        this.appSettingsModel.find().select('logo primaryColor secondaryColor textColor grayBg desktopLogoWidth mobileLogoWidth').exec(),
        this.headerFooterCMSModel.find().select('searchPlaceholder searchButtonText headerBgColor footerBgColor copyrightText').exec(),
      ]);
      const data = {
        headerFooterData,
        HeaderFooterCMS,
      };
      return ResponseUtils.successResponse(
        201,
        'fetched',
        'data',
        data,
      );
    } catch (error) {
      throw new Error(`Error fetching CMS data: ${error.message}`);
    }
  }
}
