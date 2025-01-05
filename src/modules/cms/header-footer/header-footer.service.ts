import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHeaderFooterDto } from './dto/create-header-footer.dto';
import { UpdateHeaderFooterDto } from './dto/update-header-footer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HeaderFooterCMS } from './schema/header-footer.schema';
import { Model } from 'mongoose';
import { ResponseUtils } from 'src/utils/responseUtils';

@Injectable()
export class HeaderFooterService {
  constructor(
    @InjectModel('header-footer-cms')
    private readonly HeaderFooterModal: Model<HeaderFooterCMS>,
  ) {}
  async create(createHeaderFooterDto: CreateHeaderFooterDto) {
    const isExist = await this.HeaderFooterModal.find();
    console.log(isExist)
    if (isExist?.[0]?._id ) {
      const updated = await this.HeaderFooterModal.findOneAndUpdate(
        { _id: isExist[0]._id },
        createHeaderFooterDto,
      );

      if (!updated) {
        throw new BadRequestException('Server Error!');
      }
      return ResponseUtils.successResponse(
        201,
        'Updated Header Footer CMS.',
        'data',
        updated,
      );
    } else {
      const createData = await this.HeaderFooterModal.create(createHeaderFooterDto);
      createData.save();
      return ResponseUtils.successResponse(
        201,
        'Data Created Successfully.',
        'data',
        createData,
      );
    }
  }

  async findAll() {
    try {
      const data = await this.HeaderFooterModal.find();
        if (!data) {
          throw new BadRequestException('No Header Footer CMS Found!')
        }
        return ResponseUtils.successResponse(
          200,
          'Data Fetched Successfully!',
          'data',
          data,
        );
    } catch (error) {
      throw new BadRequestException('Server Error!');
    }
  }
}
