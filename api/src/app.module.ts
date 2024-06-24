import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/service/service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './typorm/entities/Profile.entity';
import { User } from './typorm/entities/User.entity';
import { Verification } from './typorm/entities/Verification.entity';
import { ControllerController } from './user/controller/controller.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'vincent',
      password: 'Vincent07$',
      database: 'ChatWave',
      entities: [Profile, User, Verification],
      // entities: [__dirname + '/../typeorm/entities/*{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, ControllerController],
  providers: [AppService, UserService],
})
export class AppModule {}
