import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import { ReadFollowMessageResponseDto } from './dto/res.dto';

@Injectable()
export class FollowService {
  constructor(
    @Inject('FOLLOW_SERVICE') private client: ClientProxy,
    private userService: UserService,
  ) {}

  async createFollowMessage(userId: string, followId: string) {
    const user = await this.userService.findOneById(followId);
    if (!user) throw new NotFoundException();

    const pattern = { cmd: 'create-follow-message' };
    const payload = { userId, followId };
    const { id } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return id;
  }

  async createFollower(userId: string, followerId: string) {
    const follower = await this.userService.findOneById(followerId);
    if (!follower) throw new NotFoundException();

    const pattern = { cmd: 'create-follower' };
    const payload = { userId, followerId };
    const { id } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return id;
  }

  async readAllFollowMessage(userId: string) {
    const pattern = { cmd: 'read-all-followe-message' };
    const payload = { userId };
    const { followMessages } = await firstValueFrom<{
      followMessages: ReadFollowMessageResponseDto[];
    }>(
      this.client.send<{ followMessages: ReadFollowMessageResponseDto[] }>(
        pattern,
        payload,
      ),
    );
    return followMessages;
  }
}
