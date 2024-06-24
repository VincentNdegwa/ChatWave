import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/CreateUser.Dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/add')
  async addNewUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.addNewUser(createUserDto);
      return {
        error: false,
        data: user,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
