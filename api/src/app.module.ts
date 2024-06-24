import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/module/user/user.module';
import { User } from './typorm/entities/User.entity';
import { Profile } from './typorm/entities/Profile.entity';
import { Verification } from './typorm/entities/Verification.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'vincent',
      password: 'Vincent07$',
      database: 'ChatWave',
      entities: [User, Profile, Verification],
      // entities: [__dirname + '/../typorm/entities/*.entity.{ts,js}'],
      synchronize: true,
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
