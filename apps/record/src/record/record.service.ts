import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './entity/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  async create(payload: CreateRecordDto) {
    const { userId, gender, birthyear, weight, muscle, fat, kcal } = payload;

    const recordEntity = this.recordRepository.create({
      gender,
      birthyear,
      weight,
      muscle,
      fat,
      kcal,
      userId,
    });
    const record = await this.recordRepository.save(recordEntity);

    return { id: record.id };
  }
}
