import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/typorm/entities/Profile.entity';
import { User } from 'src/typorm/entities/User.entity';
import { Verification } from 'src/typorm/entities/Verification.entity';
import { UserController } from 'src/user/controller/user/user.controller';
import { UserService } from 'src/user/service/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Verification])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
