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

  async readAverage(gender: string, birthyear: number) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const ageRange = this.calculateAgeRange(currentYear, birthyear);

    const { weight, muscle, fat } = await this.recordRepository
      .createQueryBuilder('entity')
      .select('AVG(entity.weight)', 'weight')
      .addSelect('AVG(entity.muscle)', 'muscle')
      .addSelect('AVG(entity.fat)', 'fat')
      .where(
        `(${currentYear} - entity.birthyear) BETWEEN :ageRangeFrom AND :ageRangeTo`,
        { ageRangeFrom: ageRange.from, ageRangeTo: ageRange.to },
      )
      .andWhere('entity.gender = :gender', { gender })
      .getRawOne();

    return {
      weight: Math.floor(weight),
      muscle: Math.floor(muscle),
      fat: Math.floor(fat),
    };
  }

  private calculateAgeRange(
    currentYear: number,
    birthyear: number,
  ): { from: number; to: number } {
    const ageDifference = currentYear - birthyear;
    const ageRangeFrom = Math.floor(ageDifference / 10) * 10;
    const ageRangeTo = ageRangeFrom + 9;

    return { from: ageRangeFrom, to: ageRangeTo };
  }
}
