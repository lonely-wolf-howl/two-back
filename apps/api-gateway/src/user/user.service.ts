import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Provider } from './enum/user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async saveUser(
    email: string,
    username: string,
    providerId: string,
  ): Promise<User> {
    let user = await this.userRepository.findOneBy({ email });

    if (user) {
      user.username = username;
    } else {
      user = new User();

      user.email = email;
      user.username = username;
      user.provider = Provider.GOOGLE;
      user.providerId = providerId;
    }

    return this.userRepository.save(user);
  }
}
