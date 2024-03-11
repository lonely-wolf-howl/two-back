import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class FollowService {
  constructor(
    @Inject('FOLLOW_SERVICE') private client: ClientProxy,
    private userService: UserService,
  ) {}

  async createFollowMessage(userId: string, followId: string) {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException();

    const pattern = { cmd: 'create-follow-message' };
    const payload = { userId, followId };
    const { id: followMessageId } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return followMessageId;
  }
}
