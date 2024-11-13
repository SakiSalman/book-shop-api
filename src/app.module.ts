import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env automatically
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    JwtModule.register({
      global:true,
      secret : process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
