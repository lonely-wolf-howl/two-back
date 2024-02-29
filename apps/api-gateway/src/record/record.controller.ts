import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecordService } from './record.service';
import { User } from '../common/decorator/user.decorator';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { CreateRecordRequestDto } from './dto/req.dto';

@Controller('records')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Post()
  async create(
    @User() user: UserAfterAuth,
    @Body() body: CreateRecordRequestDto,
  ) {
    return await this.recordService.create(user.id, body);
  }

  @Get('average')
  async readAverage(@User() user: UserAfterAuth) {
    return await this.recordService.readAverage(user.id);
  }
}
