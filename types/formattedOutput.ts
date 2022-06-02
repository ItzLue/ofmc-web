export type IFormattedOutput = {
    inputFile: string;
    attackFound: boolean;
    goal: string;
    statistics?: {
        visitedNodes: number;
        depth: number;
    }
    attackTrace?: IAttackTrace[];
    reachedState?: string;
}

export type IAttackTrace = {
    from: string;
    to: string;
    payload: string;
}