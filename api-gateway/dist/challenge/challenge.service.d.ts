import { ClientProxy } from '@nestjs/microservices';
import { CreateChallengeRequestDto } from './dto/req.dto';
import { ReadChallengeResponseDto } from './dto/res.dto';
import { UserService } from '../user/user.service';
export declare class ChallengeService {
    private client;
    private userService;
    constructor(client: ClientProxy, userService: UserService);
    create(userId: string, body: CreateChallengeRequestDto): Promise<{
        challengeId: string;
        goalId: string;
        hostId: string;
    }>;
    readAll(page: number, size: number): Promise<{
        total: number;
        challenges: ReadChallengeResponseDto[];
    }>;
}
