export type IProtocol = {
    uid: string
    name: string
    urlSlug: string
    type: string
    isComplete: boolean
    startingCode?: string
    rawOutPut?: string
    userCode?: string
    downloadUrl?: string
    log?: string
    attackTraceUrl?: string
    userId?: string
    isTemplate?: boolean
}

export type ICreateProtocol = {
    name: string
    type: string
}
