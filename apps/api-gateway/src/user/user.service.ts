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

  async findByEmailOrSave(
    email: string,
    username: string,
    providerId: string,
  ): Promise<User> {
    const user = await this.findOne(email);
    if (user) {
      return user;
    }

    const newUser = await this.userRepository.save({
      email,
      username,
      provider: Provider.GOOGLE,
      providerId,
    });
    return newUser;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
