import { ChallengeService } from './challenge.service';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { CreateChallengeRequestDto } from './dto/req.dto';
import { PageReqDto } from '../common/dto/req.dto';
export declare class ChallengeController {
    private challengeService;
    constructor(challengeService: ChallengeService);
    create(user: UserAfterAuth, body: CreateChallengeRequestDto): Promise<{
        challengeId: string;
        goalId: string;
        hostId: string;
    }>;
    readAll({ page, size }: PageReqDto): Promise<{
        total: number;
        challenges: import("./dto/res.dto").ReadChallengeResponseDto[];
    }>;
}
