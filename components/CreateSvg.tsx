import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { IAttackTrace } from '@/types/formattedOutput'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import selectedProtocolTab from '../recoil/atoms/tabs'

type IProps = {
    attackTrace: IAttackTrace[]
    animation: boolean
}

// https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx:1255-1648
// https://www.framer.com/docs/component/
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = 1 + i * 0.8
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        }
    },
}

const CreateSvg: NextPage<IProps> = ({ attackTrace, animation }) => {

    const actors = [...new Set(attackTrace.map((a) => a.from))]

    const [payload, setPayload] = useState('')
    const [divPosition, setDivPosition] = useState<{ x: number, y: number }>({ x: 150, y: 50 })
    const [showDiv, setShowDiv] = useState(false)

    const onHoverStart = (e: MouseEvent, text: string) => {
        setPayload(text)
        setDivPosition({ x: (window.innerWidth - 500) - e.x, y: 0 })
        setShowDiv(true)
    }

    const actorsPositionMap = new Map<string, number>()
    actors.map((a, index) => actorsPositionMap.set(a, index / actors.length * 100))


    const makeActorNames = (actors: string[]): React.ReactNode => {
        return actors.map((a) => <text x={`${actorsPositionMap.get(a).toString()}%`} y='30' fill='white'>{a}</text>)
    }

    // Make vertical lines for each actor
    const makeVerticalLines = (actors: string[], steps: number): React.ReactNode => {
        return actors.map((a, index) => <line x1={`${(index / actors.length * 100)}%`} y1='35'
                                              x2={`${(index / actors.length * 100)}%`} y2={steps * 55}
                                              className='stroke-white stroke-2' />)
    }

    // Make arrows for each step in the attack trace
    const makeArrowsWPayload = (attackTrace: IAttackTrace[]): React.ReactNode => {

        const stepCoordinates = attackTrace.map((a, index) => {
            return {
                x1: (actorsPositionMap.get(a.from) / 100) * 500,
                x2: (actorsPositionMap.get(a.to) / 100) * 500,
                y1: 55 * (index + 1),
                y2: 55 * (index + 1),
            }
        })

        return stepCoordinates.map((step, index) => {

            const direction = step.x1 > step.x2 ? 'left' : 'right'

            return (
                <>
                    {/* <text x={step.x2} y={step.y1 - 10} textAnchor='middle' fontSize={16}
                          className='fill-white'>{attackTrace[index].payload}</text>*/}
                    <motion.line x1={step.x1} y1={step.y1} x2={step.x2} y2={step.y2}
                                 className='stroke-white stroke-2'
                                 custom={index} variants={draw}
                                 onHoverStart={(event) => onHoverStart(event, attackTrace[index].payload)}
                                 onHoverEnd={() => setShowDiv(false)} />
                    {direction === 'right' ? (<>
                        <motion.line x1={step.x2 - 10} y1={step.y1 + 10} x2={step.x2} y2={step.y2}
                                     className='stroke-2 stroke-white' custom={index} variants={draw} />
                        <motion.line x1={step.x2} y1={step.y1} x2={step.x2 - 10} y2={step.y2 - 10}
                                     className='stroke-2 stroke-white' custom={index} variants={draw} />
                    </>) : (
                        <>
                            <motion.line x1={step.x2 + 10} y1={step.y2 + 10} x2={step.x2} y2={step.y1}
                                         className='stroke-2 stroke-white' custom={index} variants={draw} />
                            <motion.line x1={step.x2} y1={step.y2} x2={step.x2 + 10} y2={step.y1 - 10}
                                         className='stroke-2 stroke-white' custom={index} variants={draw} />
                        </>
                    )}
                </>)
        })
    }

    /*
    return (
    <>
        <text x={50 * (index * 2)} y={50 * (index)} textAnchor='middle' fontSize={12}
              className='fill-white'>{a.step}</text>
        <line x1={60} y1='50' x2='100' y2='50' className='stroke-2 stroke-white' />
        <line x1='190.0' y1='40' x2='200.0' y2='50' className='stroke-2 stroke-white' />
        <line x1='190.0' y1='60' x2='200.0' y2='50' className='stroke-1 stroke-white' />
    </>
    )

    */

    return (
        <div className='relative'>
            <motion.svg className='h-full z-0' width={500} height='100%' initial={animation ? 'hidden' : 'visible'}
                        animate='visible'>
                {makeActorNames(actors)}
                {makeVerticalLines(actors, attackTrace.length)}
                {makeArrowsWPayload(attackTrace)}
            </motion.svg>
            <div className={`${showDiv ? 'absolute' : 'hidden'} bg-blue-500 z-20 opacity-70 min-w-min p-2 rounded-full word-break`}
                 style={{ left: `${divPosition.x}px `, top: '30px' }}>
                {payload}
            </div>
        </div>
    )

}

export default CreateSvg
