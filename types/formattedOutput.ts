export type IFormattedOutput = {
    inputFile: string
    attackFound: boolean
    goal: string
    statistics?: {
        visitedNodes: number
        depth: number
        time: number
        parseTime: number
    }
    attackTrace?: IAttackTrace[]
    reachedState?: string
}

export type IAttackTrace = {
    from: string
    to: string
    payload: string
    step: string
}
