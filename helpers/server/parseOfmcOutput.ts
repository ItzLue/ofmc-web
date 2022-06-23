import { IFormattedOutput } from '@/types/formattedOutput'

const parseOfmcOutput = (output: string): IFormattedOutput => {
    const lines = output.split('\n')
    const inputFile = lines[1].split('/')[2]
    const attackFound = !output.includes('NO_ATTACK_FOUND')
    const goal = lines[lines.findIndex((line) => line.includes('GOAL')) + 1]
    const visitedNodesLine = lines.find((line) => line.includes('visitedNodes'))
    const depthLine = lines.find((line) => line.includes('depth'))
    const timeLine = lines.find((line) => line.includes('TIME'))
    const parseTimeLine = lines.find((line) => line.includes('parseTime'))

    const visitedNodes = visitedNodesLine
        ? parseInt(visitedNodesLine.substring(16).split(' ')[0])
        : undefined
    const time = timeLine ? parseInt(timeLine.substring(4).split(' ')[0]) : undefined
    const parseTime = parseTimeLine ? parseInt(parseTimeLine.substring(9).split(' ')[0]) : undefined
    const depth = depthLine ? parseInt(depthLine.substring(9).split(' ')[0]) : undefined
    let statistics = undefined
    if ((visitedNodes && depth) || time || parseTime) {
        statistics = {
            visitedNodes,
            depth,
            time,
            parseTime,
        }
    }

    if (attackFound) {
        const attackTrace = []
        const attackTraceLineIndex = lines.findIndex((line) => line.includes('ATTACK TRACE'))
        const reachedStateLineIndex = lines.findIndex((line) => line.includes('Reached State'))

        let step = 1
        for (let i = attackTraceLineIndex + 1; i < reachedStateLineIndex - 2; i++) {
            const from = lines[i].split(' ')[0].replace(' ', '')
            const to = lines[i].split(' ')[2].replace(' ', '').replace(':', '')
            const payload = lines[i].split(' ')[3].replace(' ', '')
            attackTrace.push({
                step: step,
                from,
                to,
                payload,
            })
            if (from === 'i') step++
        }
        return {
            inputFile,
            attackFound: attackFound,
            goal,
            attackTrace,
            statistics,
        }
    }

    return {
        inputFile,
        attackFound: attackFound,
        goal,
        statistics,
    }
}
export default parseOfmcOutput
