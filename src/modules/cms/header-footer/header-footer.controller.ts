import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HeaderFooterService } from './header-footer.service';
import { CreateHeaderFooterDto } from './dto/create-header-footer.dto';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('cms/header-footer-cms')
export class HeaderFooterController {
  constructor(private readonly headerFooterService: HeaderFooterService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createHeaderFooterDto: CreateHeaderFooterDto) {

    console.log(createHeaderFooterDto)
    return this.headerFooterService.create(createHeaderFooterDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.headerFooterService.findAll();
  }
}
