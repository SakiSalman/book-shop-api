import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailSenderModule } from './modules/email-sender/email-sender.module';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AppSettingsModule } from './modules/cms/app-settings/app-settings.module';
import { SiteFrontendModule } from './modules/site-frontend/site-frontend.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env automatically
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    JwtModule.register({
      global:true,
      secret : process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      template: {
        dir:`${process.cwd()}`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    
    CloudinaryModule,
    EmailSenderModule,
    AppSettingsModule,
    SiteFrontendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
