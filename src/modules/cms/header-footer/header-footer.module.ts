import { Module } from '@nestjs/common';
import { HeaderFooterService } from './header-footer.service';
import { HeaderFooterController } from './header-footer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HeaderFooterCMS, HeaderFooterSchema } from './schema/header-footer.schema';

@Module({
  imports: [
        MongooseModule.forFeature([{ name:"header-footer-cms", schema: HeaderFooterSchema }]),
      ],
  controllers: [HeaderFooterController],
  providers: [HeaderFooterService],
})
export class HeaderFooterModule {}
