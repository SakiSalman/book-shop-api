import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, ForgotPasswordDto, ResetPasswordDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{name : 'image', maxCount : 1}]))
  create(@Body() createAuthDto: CreateAuthDto, @UploadedFiles() files:{
    image?:Express.Multer.File
  }) {
    return this.authService.create(createAuthDto, files);
  }
  @Post('/create-admin')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{name : 'image', maxCount : 1}]))
  createAdmin(@Body() createAuthDto: CreateAuthDto, @Req() request:Request, @UploadedFiles() files:{
    image?:Express.Multer.File
  }) {
    return this.authService.createAdmin(createAuthDto,request,files);
  }
  @Post('/login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
  @Post('/send-verification')
  forgotPassword(@Body() ForgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(ForgotPasswordDto);
  }
  @Post('/reset-password')
  resetPassword(@Body() resetPassword: ResetPasswordDto, @Query() query: {
    token : string
  }) {
    return this.authService.resetPassword(resetPassword, query);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.authService.findAll();
  }

  @Get('/profile/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }
  @Get('/admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.authService.findOneAdmin(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
