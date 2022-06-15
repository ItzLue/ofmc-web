import React from 'react'
import { NextPage } from 'next'
import { IAttackTrace } from '@/types/formattedOutput'

type IProps = {
    attackTrace: IAttackTrace[]
}

const CreateSvg: NextPage<IProps> = ({ attackTrace }) => {

    const actors = [...new Set(attackTrace.map((a) => a.from))]


    const makeActorNames = (actors: string[]): React.ReactNode => {
        return actors.map((a, index) => <text x={0 + (15 * index * 6)} y='15' fill='white'>{a}</text>)
    }

    // Make vertical lines for each actor
    const makeVerticalLines = (actors: string[]): React.ReactNode => {
        return actors.map((a, index) => <line x1={15 * index * 6} y1='0' x2={15 * index * 6} y2='100' stroke='white'
                                              strokeWidth='1' />)
    }

    // Make arrows for each step in the attack trace
    const makeArrowsWPayload = (attackTrace: IAttackTrace[]): React.ReactNode => {
        return attackTrace.map((a, index) => {
            const x1 = 15 * index * 6
            const y1 = a.from === a.to ? 100 : 0
            const x2 = 15 * index * 6 + 15
            const y2 = a.from === a.to ? 100 : 0
            return (
                <>
                    <text x={50} y={45} textAnchor="middle" fontSize={12}>{a.payload}</text>
                    <line x1='50.0' y1='50' x2='200.0' y2='50' style={{ stroke: 'white', strokeWidth: 2  }} />
                    <line x1='190.0' y1='40' x2='200.0' y2='50' style={{ stroke: 'white', strokeWidth: 2  }} />
                    <line x1='190.0' y1='60' x2='200.0' y2='50' style={{ stroke: 'white', strokeWidth: 2  }} />
                </>
            )
        })
    }

    return (
        <svg className='stroke-1 fill-white p-8' viewBox='0 0 400 400' style={{ width: 500, height: 500 }}>
            {makeActorNames(actors)}
            {makeVerticalLines(actors)}
            {makeArrowsWPayload(attackTrace)}
        </svg>)

}

export default CreateSvg
