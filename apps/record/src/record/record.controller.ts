import { Controller } from '@nestjs/common';
import { RecordService } from './record.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRecordDto } from './dto/create-record.dto';

@Controller()
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @MessagePattern({ cmd: 'create-record' })
  async create(payload: CreateRecordDto): Promise<{ id: string }> {
    return await this.recordService.create(payload);
  }

  // @MessagePattern({ cmd: 'read-average' })
  // async readAverage(): Promise<{
  //   weight: number;
  //   muscle: number;
  //   fat: number;
  // }> {
  //   return await this.recordService.readAverage();
  // }
}
