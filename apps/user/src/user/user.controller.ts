import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'getMe' })
  async getMe(
    userId: string,
  ): Promise<{ username: string; gender: string; birthyear: number }> {
    return await this.userService.getMe(userId);
  }

  @MessagePattern({ cmd: 'findOneByEmail' })
  async findOneByEmail(email: string): Promise<{ id: string }> {
    return await this.userService.findOneByEmail(email);
  }

  @MessagePattern({ cmd: 'createUser' })
  async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ id: string }> {
    return await this.userService.createUser(email, password);
  }

  @MessagePattern({ cmd: 'createUserDetail' })
  async createUserDetail({
    user,
    username,
    gender,
    birthyear,
  }: {
    user: string;
    username: string;
    gender: string;
    birthyear: number;
  }): Promise<{ id: string }> {
    return await this.userService.createUserDetail(
      user,
      username,
      gender,
      birthyear,
    );
  }

  @MessagePattern({ cmd: 'validate' })
  async validate({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ id: string }> {
    return await this.userService.validate(email, password);
  }
}
