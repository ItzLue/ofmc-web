import React from 'react'
import { IFormattedOutput } from '@/types/formattedOutput'

type IProps = {
    result?: IFormattedOutput
}

const AttackSimplified: React.FC<IProps> = ({ result }) => {

    return (
        <div>
            {result?.attackTrace ? <div>
                <div className='flex flex-col px-4 gap-4 pt-4'>
                    <span>Goal: {result.goal}</span>
                    <span>Depth: {result.statistics?.depth}</span>
                    <span>Visisted nodes: {result.statistics?.visitedNodes}</span>
                    <span>Total steps: {[...new Set(result.attackTrace.map((a) => a.step))].length}</span>
                    <div className="flex flex-col gap-4 mb-32">
                        {result.attackTrace.map((a) => (
                            <div className="flex flex-col gap-2">
                                <span>Step: {a.step}</span>
                                <span>From: {a.from}</span>
                                <span>To: {a.to}</span>
                                <span>Payload: {a.payload}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div> : <div>
                No attack found
            </div>}
        </div>)

}

export default AttackSimplified
