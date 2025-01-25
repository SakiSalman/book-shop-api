import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { BookTagSchema } from './schema/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports:[
       MongooseModule.forFeature([{ name: 'tags', schema: BookTagSchema }]),
    ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
