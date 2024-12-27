import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { decriptPassword, encriptPassword } from 'src/helper/bycript';
import { Request, response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private jwtService : JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { name, email, password, role } = createAuthDto;

    // Manual validation for required fields
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!role) missingFields.push('role');
    if (missingFields.length) {
      throw new BadRequestException(
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }
    if (role === 'admin') {
      throw new BadRequestException('Unauthorized!');
    }
    const existingUser = await this.authModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    createAuthDto.password = await encriptPassword(password);

    const newUser = new this.authModel(createAuthDto);
    return await newUser.save();
  }

  // Create admin
  async createAdmin(createAuthDto: CreateAuthDto, request:Request) {
    const { name, email, password, role } = createAuthDto;

    // Manual validation for required fields
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!role) missingFields.push('role');
    if (missingFields.length) {
      throw new BadRequestException(
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
     
    if (!token) {
      throw new BadRequestException(
        `Only admin can create admin!`,
      );
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET
    })
    const checkAdmin = await this.authModel.findOne({
      email : payload.email,
      role: { $in: ['admin', 'master-admin'] },
    });

    if (!checkAdmin) {
      throw new BadRequestException(
        `Only admin can create admin!`,
      );
    }
    const existingUser = await this.authModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    createAuthDto.password = await encriptPassword(password);

    const newUser = new this.authModel(createAuthDto);
    const user = await newUser.save();
    let data ={
     ...user
    }
    return ResponseUtils.successResponse(200, "Admin Created Successfully!", 'data', data)
  }

  async findAll() {
    const allUsers = await this.authModel.find();
    return allUsers;
  }

  async findOne(id: string) {
    try {
      const user = await this.authModel.find({
        _id : id,
        role : 'customer'
      }).select('-password');

      if (!user) {
        throw new BadRequestException('User Not Found!');
      }
      let data = {
        data: user,
      };
      return ResponseUtils.successResponse(200, "User Found!", 'data', {...data})
    } catch (error) {
      throw new BadRequestException('Server Error!');
    }
  }
  async findOneAdmin(id: string) {
    try {
      const user = await this.authModel.findOne({
        _id : id,
        role : 'admin'
      }).select('-password');
      if (!user) {
        throw new BadRequestException('User Not Found!');
      }
      let data = {
        data: user,
      };
      return ResponseUtils.successResponse(200, "User Found!", 'data', {...data})
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new BadRequestException('Server Error!');
      }    }
  }
async login (dto:CreateAuthDto) {
 try {
  let {email, password} = dto
  const missingFields = [];
  if (!email) missingFields.push('email');
  if (!password) missingFields.push('password');
  if (missingFields.length) {
    throw new BadRequestException(
      `Missing required fields: ${missingFields.join(', ')}`,
    );
  }
  const isExist = await this.authModel.findOne({email})

  if (!isExist) {
    throw new BadRequestException('No Registered User Found!');
  }
  const checkPassword = await decriptPassword(password, isExist.password)
  if (!checkPassword) {
    throw new BadRequestException('Wrong password!');
  }
  let payload = {email : isExist.email, _id:isExist._id}
  const token = await this.jwtService.signAsync(payload)

  if (!token) {
    throw new BadRequestException('Server Error!');
  }
  const userWithoutPassword = isExist.toObject();
  const { password: ignorePassword, email: ignoreEmail, ...loginInfo } = userWithoutPassword;
  let data ={
    ...loginInfo,
    token : token,
  }
  return ResponseUtils.successResponse(200, "Login Successfull!", 'data', data)
 } catch (error) {
  if (error instanceof BadRequestException) {
    throw error;
  } else {
    throw new BadRequestException('Server Error!');
  }
 }
}
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
