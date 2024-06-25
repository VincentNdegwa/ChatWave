import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Verification } from 'src/verification/entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Verification])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
