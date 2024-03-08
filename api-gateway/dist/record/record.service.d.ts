import { ClientProxy } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { CreateRecordRequestDto } from './dto/req.dto';
export declare class RecordService {
    private client;
    private userService;
    constructor(client: ClientProxy, userService: UserService);
    create(userId: string, body: CreateRecordRequestDto): Promise<string>;
    readAverage(userId: string): Promise<unknown>;
    private calculateAgeRange;
}
