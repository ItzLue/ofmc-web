import React from 'react'
import { IFormattedOutput } from '@/types/formattedOutput'
import { motion } from 'framer-motion'

type IProps = {
    result?: IFormattedOutput
}

const AttackSimplified: React.FC<IProps> = ({ result }) => {

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => {
            const delay = 1 + i * 0.5
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

    const textAnimate = {
        hidden: {
            y: '200%'
            , color: 'white',
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },

        },
        visible: {
            y: 0,
            color: 'white',
            transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
        },
    }

    return (
        <div>
            {(result?.attackTrace && result?.attackFound) && <div>
                <div className='flex flex-col px-4 gap-4 pt-4 break-words'>
                    <span>Goal: {result.goal}</span>
                    <span>Depth: {result.statistics?.depth}</span>
                    <span>Visisted nodes: {result.statistics?.visitedNodes}</span>
                    <span>Total steps: {[...new Set(result.attackTrace.map((a) => a.step))].length}</span>
                    <div className='flex flex-col gap-4 mb-32'>
                        {result.attackTrace.map((a) => (
                            <div className='flex flex-col gap-2'>
                                <span>Step: {a.step}</span>
                                <span>From: {a.from}</span>
                                <span>To: {a.to}</span>
                                <span>Payload: {a.payload}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>}
            {result?.attackFound === false &&
                <motion.div className='flex flex-col gap-2 w-full h-full justify-center text-center items-center' initial="hidden" variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.25
                        }
                    }
                }}>
                    <motion.span className="text-white text-2xl" variants={textAnimate} custom={1}>
                        No attack found
                    </motion.span>
                    <motion.svg
                        initial='hidden'
                        animate='visible'
                        width='350'
                        height='350'
                    >
                        <motion.path
                            d="M 0 100 L 100 200 L 230 0"
                            transform="translate(50 100)"
                            fill="transparent"
                            strokeWidth="65"
                            className="stroke-green-600"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={draw}
                            custom={1}
                        />
                    </motion.svg>


                </motion.div>}
        </div>
    )
}

export default AttackSimplified
