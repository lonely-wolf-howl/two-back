import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getMe(userId: string) {
    const user: User = await this.userRepository.findOneBy({ id: userId });
    const result = {
      username: user.username,
      email: user.email,
      gender: user.gender,
      birthyear: user.birthyear,
    };
    return result;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
