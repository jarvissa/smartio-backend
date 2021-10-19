import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DevicesController } from './devices/devices.controller';
import { DevicesModule } from './devices/devices.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/smartio'),
    AuthModule,
    UsersModule,
    DevicesModule,
  ],
  controllers: [AppController, DevicesController],
  providers: [AppService],
})
export class AppModule {}
