import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  async getMe(userId: string) {
    const pattern = { cmd: 'get-me' };
    const payload = { userId };
    const { username, gender, birthyear } = await firstValueFrom<{
      username: string;
      gender: string;
      birthyear: number;
    }>(
      this.client.send<{ username: string; gender: string; birthyear: number }>(
        pattern,
        payload,
      ),
    );
    return { username, gender, birthyear };
  }

  async findOneByEmail(email: string) {
    const pattern = { cmd: 'find-one-by-email' };
    const payload = email;
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async createUser(email: string, password: string) {
    const pattern = { cmd: 'create-user' };
    const payload = { email, password };
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }

  async createUserDetail(
    userId: string,
    username: string,
    gender: string,
    birthyear: number,
  ) {
    const pattern = { cmd: 'create-user-detail' };
    const payload = { userId, username, gender, birthyear };
    const { id: userDetailId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userDetailId;
  }

  async validateUser(email: string, password: string) {
    const pattern = { cmd: 'validate-user' };
    const payload = { email, password };
    const { id: userId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return userId;
  }
}
