import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { EmailSenderModule } from 'src/modules/email-sender/email-sender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    CloudinaryModule,
    EmailSenderModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
