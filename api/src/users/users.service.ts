import { Injectable } from '@nestjs/common';
import { createUserParams, updateUserParams } from 'src/type';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDetails: createUserParams) {
    try {
      const newUser = this.userRepository.create({
        ...userDetails,
        created_at: new Date(),
      });
      const user = await this.userRepository.save(newUser);
      return { error: false, message: 'User added!', data: user };
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['profile', 'verification'],
      });
      return { error: false, message: 'Users retrieved!', data: users };
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['profile', 'verification'],
      });
      if (user) {
        return { error: false, message: 'User found!', data: user };
      } else {
        return { error: true, message: 'User not found', data: null };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async update(id: number, userDetails: updateUserParams) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (user && user.password === userDetails.old_password) {
        await this.userRepository.update(id, {
          password: userDetails.new_password,
        });
        return { error: false, message: 'User updated', data: user };
      } else {
        return {
          error: true,
          message: 'Old password is incorrect or user not found',
          data: null,
        };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }

  async remove(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected) {
        return { error: false, message: 'User deleted', data: result };
      } else {
        return { error: true, message: 'User not found', data: null };
      }
    } catch (error) {
      return { error: true, message: error.message, data: null };
    }
  }
}
