import { Injectable } from '@nestjs/common';
import { AppSettings } from '../cms/app-settings/schema/appSettings.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class SiteFrontendService {
  constructor(
    @InjectModel(AppSettings.name)
    private readonly appSettingsModel: Model<AppSettings>,
    // Inject other models if needed
  ) {}

  async getHeaderFooterCMS() {
    try {
      const [headerFooterData] = await Promise.all([
        this.appSettingsModel.find().select('logo primaryColor secondaryColor textColor grayBg desktopLogoWidth mobileLogoWidth').exec(),
      ]);
      const data = {
        headerFooterData,
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
