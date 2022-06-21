import React, { useRef, useState } from 'react'
import { NextPage } from 'next'
import { IAttackTrace } from '@/types/formattedOutput'
import { motion } from 'framer-motion'

type IProps = {
    attackTrace: IAttackTrace[]
    animation: boolean
}

// https://codesandbox.io/s/framer-motion-svg-checkbox-kqm7y?file=/src/Example.tsx:1255-1648
// https://www.framer.com/docs/component/
const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = 1 + i * 0.4
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

    const wrapperRef = useRef<HTMLDivElement>(null)

    const onHoverStart = (e: MouseEvent, text: string, x: number, y: number) => {
        setPayload(text)
        setDivPosition({ x: x, y: y })
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
                    <motion.line x1={step.x1} y1={step.y1} x2={step.x2} y2={step.y2}
                                 className='stroke-white stroke-2'
                                 custom={index}
                                 variants={draw} />
                    {direction === 'right' ? (<>
                        <motion.line x1={step.x2 - 10} y1={step.y1 + 10} x2={step.x2} y2={step.y2}
                                     className='stroke-2 stroke-white' custom={index} variants={draw} />
                        <motion.line x1={step.x2} y1={step.y1} x2={step.x2 - 10} y2={step.y2 - 10}
                                     className='stroke-2 stroke-white' custom={index} variants={draw} />
                        <motion.text x={step.x1 + 10} y={step.y2 + 15}
                                     className='fill-white'
                                     onHoverStart={(event) => onHoverStart(event, attackTrace[index].payload, step.x1, step.y1)}
                                     custom={index}
                                     variants={draw}>Step {attackTrace[index].step}</motion.text>
                    </>) : (
                        <>
                            <motion.line x1={step.x2 + 10} y1={step.y2 + 10} x2={step.x2} y2={step.y1}
                                         className='stroke-2 stroke-white' custom={index} variants={draw} />
                            <motion.line x1={step.x2} y1={step.y2} x2={step.x2 + 10} y2={step.y1 - 10}
                                         className='stroke-2 stroke-white' custom={index} variants={draw} />
                            <motion.text x={step.x2 + 15} y={step.y2 + 15} className='fill-white'
                                         onHoverStart={(event) => onHoverStart(event, attackTrace[index].payload, step.x1, step.y1)}
                                         custom={index}
                                         variants={draw}
                            >Step {attackTrace[index].step}</motion.text>
                        </>
                    )}
                </>)
        })
    }

    return (
        <div className='relative' ref={wrapperRef}>
            <motion.svg className='h-full z-0' width={500} height='100%' initial={animation ? 'hidden' : 'visible'}
                        animate='visible'>
                {makeActorNames(actors)}
                {makeVerticalLines(actors, attackTrace.length)}
                {makeArrowsWPayload(attackTrace)}
            </motion.svg>
            <div
                className={`${showDiv ? 'absolute' : 'hidden'} bg-blue-500 z-20 min-w-min p-4 rounded-full break-all select-none`}
                style={{ left: 0, top: `${divPosition.y}px` }}>
                {payload}
            </div>
        </div>
    )

}

export default CreateSvg
