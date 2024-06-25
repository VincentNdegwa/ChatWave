import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { VerificationModule } from './verification/verification.module';
import { User } from './users/entities/user.entity';
import { Profile } from './profiles/entities/profile.entity';
import { Verification } from './verification/entities/verification.entity';
import { ProfilesService } from './profiles/profiles.service';
import { UsersModule } from './users/users.module';

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
      synchronize: true,
      logging: true,
    }),
    ProfilesModule,
    UsersModule,
    VerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProfilesService],
})
export class AppModule {}
