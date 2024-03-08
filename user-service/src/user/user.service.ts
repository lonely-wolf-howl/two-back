import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserDetail } from './entity/user-detail.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    if (!userDetail) throw new NotFoundException('cannot find user detail.');

    const result = {
      username: userDetail.username,
      gender: userDetail.gender,
      birthyear: userDetail.birthyear,
    };
    return result;
  }

  async findOneByEmail(email: string) {
    const user: User = await this.userRepository.findOneBy({ email });
    return { id: user?.id || null };
  }

  async createUser(email: string, password: string) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const userEntity = this.userRepository.create({
      email,
      password: hash,
    });
    const user = await this.userRepository.save(userEntity);
    return { id: user.id };
  }

  async createUserDetail(userId, username, gender, birthyear) {
    const userDetailEntity = this.userDetailRepository.create({
      user: { id: userId },
      username,
      gender,
      birthyear,
    });
    const userDetail = await this.userDetailRepository.save(userDetailEntity);
    return { id: userDetail.id };
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    return { id: user.id };
  }
}
