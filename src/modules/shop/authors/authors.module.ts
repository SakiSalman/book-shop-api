import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookShopAuthorSchema } from './schema/authors.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name : 'authors',
        schema : BookShopAuthorSchema
      }
    ])
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
