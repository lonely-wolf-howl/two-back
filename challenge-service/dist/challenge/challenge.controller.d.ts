import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entity/challenge.entity';
export declare class ChallengeController {
    private readonly challengeService;
    constructor(challengeService: ChallengeService);
    create(payload: CreateChallengeDto): Promise<{
        challengeId: string;
        goalId: string;
        hostId: string;
    }>;
    readAll({ page, size, }: {
        page: number;
        size: number;
    }): Promise<{
        total: number;
        challenges: Challenge[];
    }>;
}
