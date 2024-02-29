import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../user/user.service';
import { CreateRecordRequestDto } from './dto/req.dto';
import { cache } from './cache/record-cache';

@Injectable()
export class RecordService {
  constructor(
    @Inject('RECORD_SERVICE') private client: ClientProxy,
    private userService: UserService,
  ) {}

  async create(userId: string, body: CreateRecordRequestDto) {
    const { gender, birthyear } = await this.userService.getMe(userId);

    const ageRange = this.calculateAgeRange(birthyear);

    const pattern = { cmd: 'create-record' };
    const payload = { userId, gender, birthyear, ...body };
    const { id } = await firstValueFrom<{
      id: string;
    }>(this.client.send<{ id: string }>(pattern, payload));

    await cache.del(`average-${gender}-${ageRange}`);

    return id;
  }

  async readAverage(userId: string) {
    const { gender, birthyear } = await this.userService.getMe(userId);

    const ageRange = this.calculateAgeRange(birthyear);

    const GET = await cache.get(`average-${gender}-${ageRange}`);
    if (GET) {
      console.log('AVERAGE CACHE - GET');
      return GET;
    }

    const pattern = { cmd: 'read-average' };
    const payload = { gender, birthyear };
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

    await cache.set(`average-${gender}-${ageRange}`, {
      weight,
      muscle,
      fat,
    });

    return { weight, muscle, fat };
  }

  private calculateAgeRange(birthyear: number): number {
    const current = new Date();
    const currentyear = current.getFullYear();

    const ageDifference = currentyear - birthyear;
    const ageRange = Math.floor(ageDifference / 10) * 10;

    return ageRange;
  }
}
