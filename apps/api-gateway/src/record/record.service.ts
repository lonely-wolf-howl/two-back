import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import { CreateRecordRequestDto } from './dto/req.dto';

@Injectable()
export class RecordService {
  constructor(
    @Inject('RECORD_SERVICE') private client: ClientProxy,
    private userService: UserService,
  ) {}

  async create(userId: string, body: CreateRecordRequestDto) {
    const { gender, birthyear } = await this.userService.getMe(userId);

    const pattern = { cmd: 'create-record' };
    const payload = { userId, gender, birthyear, ...body };
    const { id } = await firstValueFrom<{
      id: string;
    }>(this.client.send<{ id: string }>(pattern, payload));
    return id;
  }

  async readAverage() {
    const pattern = { cmd: 'read-average' };
    const payload = {};
    const { weight, muscle, fat } = await firstValueFrom<{
      weight: number;
      muscle: string;
      fat: string;
    }>(
      this.client.send<{ weight: number; muscle: string; fat: string }>(
        pattern,
        payload,
      ),
    );
    return { weight, muscle, fat };
  }
}
