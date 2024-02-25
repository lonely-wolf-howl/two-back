import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserDetail } from './entity/user-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {}

  async getMe(userId: string) {
    const userDetail: UserDetail = await this.userDetailRepository.findOneBy({
      user: { id: userId },
    });
    const result = {
      username: userDetail.username,
      gender: userDetail.gender,
      birthyear: userDetail.birthyear,
    };
    return result;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
