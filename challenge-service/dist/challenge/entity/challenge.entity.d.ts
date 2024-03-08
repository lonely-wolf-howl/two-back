import { Goal } from './goal.entity';
import { Challenger } from './challenger.entity';
export declare class Challenge {
    id: string;
    host: string;
    title: string;
    startDate: Date;
    endDate: Date;
    week: number;
    limit: number;
    isPublic: boolean;
    description: string;
    entryPoint: number;
    isStarted: boolean;
    isDistributed: boolean;
    createdAt: Date;
    goal: Goal;
    challenger: Challenger[];
    userId: string;
}
