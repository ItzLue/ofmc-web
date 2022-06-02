import React from 'react'
import { IAttackTrace, IFormattedOutput } from '../types/formattedOutput'

type IProps = {
    attackTrace: IAttackTrace[];
}

const createStep = (attackTrace: IAttackTrace) => {

    return (
        <>
            <text className='fill-white' x={0} style={{ fontSize: '2px' }}>{attackTrace.from}</text>
            <line x1={10} y1={0} x2={10} y2='100%' stroke='white' />
        </>
    )
}

const Diagram: React.FC<IProps> = ({ attackTrace }) => {

    return (
        <svg viewBox='0 0 100 100' height='100%' width='100%'>
            {createStep(attackTrace[0])}
        </svg>)

}

export default Diagram
