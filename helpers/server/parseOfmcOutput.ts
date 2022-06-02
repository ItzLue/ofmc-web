import { IFormattedOutput } from '../../types/formattedOutput'

const parseOfmcOutput = (output: string): IFormattedOutput => {

    const lines = output.split('\n')
    const inputFile = lines[2].substring(3)
    const attackFound = lines[4].toLowerCase().includes('attack_found')
    const goal = lines[6].substring(2)
    const visitedNodesLine = lines.find(line => line.includes('visitedNodes'))
    const depthLine = lines.find(line => line.includes('depth'))

    const visitedNodes = visitedNodesLine ? parseInt(visitedNodesLine.substring(16).split(' ')[0]) : undefined
    const depth = depthLine ? parseInt(depthLine.substring(9).split(' ')[0]) : undefined
    let statistics = undefined
    if (visitedNodes && depth) {
        statistics = {
            visitedNodes,
            depth,
        }
    }

    if (attackFound) {
        const attackTrace = []
        const attackTraceLineIndex = lines.findIndex(line => line.includes('ATTACK TRACE'))
        const reacedStateLineIndex = lines.findIndex(line => line.includes('Reached State'))

        for (let i = attackTraceLineIndex + 1; i < reacedStateLineIndex - 2; i++) {
            const from = lines[i].split(' ')[0].replace(' ', '')
            const to = lines[i].split(' ')[2].replace(' ', '').replace(':', '')
            const payload = lines[i].split(' ')[3].replace(' ', '')
            attackTrace.push({
                from,
                to,
                payload,
            })
        }
        return {
            inputFile,
            attackFound,
            goal,
            attackTrace,
            statistics
        }
    }

    return {
        inputFile,
        attackFound,
        goal,
        statistics,
    }
}
export default parseOfmcOutput
