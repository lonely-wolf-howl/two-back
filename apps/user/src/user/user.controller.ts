import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'get-me' })
  async getMe({
    userId,
  }: {
    userId: string;
  }): Promise<{ username: string; gender: string; birthyear: number }> {
    return await this.userService.getMe(userId);
  }

  @MessagePattern({ cmd: 'find-one-by-email' })
  async findOneByEmail(email: string): Promise<{ id: string }> {
    return await this.userService.findOneByEmail(email);
  }

  @MessagePattern({ cmd: 'create-user' })
  async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ id: string }> {
    return await this.userService.createUser(email, password);
  }

  @MessagePattern({ cmd: 'create-user-detail' })
  async createUserDetail({
    userId,
    username,
    gender,
    birthyear,
  }: {
    userId: string;
    username: string;
    gender: string;
    birthyear: number;
  }): Promise<{ id: string }> {
    return await this.userService.createUserDetail(
      userId,
      username,
      gender,
      birthyear,
    );
  }

  @MessagePattern({ cmd: 'validate-user' })
  async validateUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ id: string }> {
    return await this.userService.validate(email, password);
  }
}
