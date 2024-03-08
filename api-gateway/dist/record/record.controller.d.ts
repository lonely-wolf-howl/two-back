import { RecordService } from './record.service';
import { UserAfterAuth } from '../common/decorator/user.decorator';
import { CreateRecordRequestDto } from './dto/req.dto';
export declare class RecordController {
    private recordService;
    constructor(recordService: RecordService);
    create(user: UserAfterAuth, body: CreateRecordRequestDto): Promise<string>;
    readAverage(user: UserAfterAuth): Promise<unknown>;
}
