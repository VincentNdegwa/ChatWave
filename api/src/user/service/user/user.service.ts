import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { User } from 'src/typorm/entities/User.entity';
import { createUserParams } from 'src/typorm/utilities/types';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private apiUrl = 'https://api.mobitechtechnologies.com/sms/sendsms';
  private apiKey =
    'ab247e45600f700f396843af5a9e99bc4a9624f14b44e1210ba938025cba03f3';

  async addNewUser(userDetails: createUserParams) {
    const user = this.userRepository.create({
      ...userDetails,
      created_at: new Date(),
    });
    return this.userRepository.save(user);
  }

  async sendOTP(phone: string, code: string) {
    const data = {
      mobile: phone,
      response_type: 'json',
      sender_name: '23107',
      service_id: 0,
      message: code,
    };
    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
          h_api_key: this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error sending SMS: ${error.message}`);
    }
  }
}
