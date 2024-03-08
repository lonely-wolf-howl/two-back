import { Challenge } from './challenge.entity';
export declare class Challenger {
    id: string;
    isHost: boolean;
    isSuccess: boolean;
    challenge: Challenge;
    userId: string;
}
