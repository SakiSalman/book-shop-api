import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('/create-admin')
  @UseGuards(AuthGuard)
  createAdmin(@Body() createAuthDto: CreateAuthDto, @Req() request:Request) {
    return this.authService.createAdmin(createAuthDto,request);
  }
  @Post('/login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
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
