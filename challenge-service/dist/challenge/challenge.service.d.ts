import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Repository } from 'typeorm';
import { Challenge } from './entity/challenge.entity';
import { Goal } from './entity/goal.entity';
import { Challenger } from './entity/challenger.entity';
export declare class ChallengeService {
    private challengeRepository;
    private goalRepository;
    private challengerRepository;
    constructor(challengeRepository: Repository<Challenge>, goalRepository: Repository<Goal>, challengerRepository: Repository<Challenger>);
    create(payload: CreateChallengeDto): Promise<{
        challengeId: string;
        goalId: string;
        hostId: string;
    }>;
    readAll(page: number, size: number): Promise<{
        total: number;
        challenges: Challenge[];
    }>;
}
