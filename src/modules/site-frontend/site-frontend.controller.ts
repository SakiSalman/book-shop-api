import { Controller, Get } from "@nestjs/common";
import { SiteFrontendService } from "./site-frontend.service";

@Controller('site')
export class SiteFrontendController {
  constructor(private readonly siteFrontendService: SiteFrontendService) {}

  @Get('/header-cms')
  getHeaderFooterCMS() {
    return this.siteFrontendService.getHeaderFooterCMS();
  }
}
