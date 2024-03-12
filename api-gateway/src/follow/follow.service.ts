import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import {
  ReadFollowMessageResponseDto,
  ReadFollowerResponseDto,
} from './dto/res.dto';

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

  async readAllFollowMessagesToMe(userId: string) {
    const pattern = { cmd: 'read-all-follow-messages-to-me' };
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

  async readAllFollowers(userId: string) {
    const pattern = { cmd: 'read-all-followers' };
    const payload = { userId };
    const { followers } = await firstValueFrom<{
      followers: ReadFollowerResponseDto[];
    }>(
      this.client.send<{ followers: ReadFollowerResponseDto[] }>(
        pattern,
        payload,
      ),
    );
    return followers;
  }

  async cancelFollowMessage(userId: string, followId: string) {
    const pattern = { cmd: 'cancel-follow-message' };
    const payload = { userId, followId };
    const { id } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return id;
  }

  async rejectFollowMessage(userId: string, followerId: string) {
    const pattern = { cmd: 'reject-follow-message' };
    const payload = { userId, followerId };
    const { id } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return id;
  }

  async deleteFollower(userId: string, followerId: string) {
    const pattern = { cmd: 'delete-follower' };
    const payload = { userId, followerId };
    const { id } = await firstValueFrom<{ id: string }>(
      this.client.send<{ id: string }>(pattern, payload),
    );
    return id;
  }
}
