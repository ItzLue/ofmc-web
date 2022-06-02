import React, { useState } from 'react'
import { AnimatePresence, motion, useTime } from 'framer-motion'

//https://codesandbox.io/s/framer-motion-notifications-5cvo9?file=/src/Example.tsx
type IProps = {
    text: string;
    type: 'success' | 'error' | 'info';
}
const Notification: React.FC<IProps> = ({ text, type }) => {

    const [isVisible, setIsVisible] = useState(true)

    setTimeout(() => {
        setIsVisible(false)
    }, 3000)

    return (
        <AnimatePresence initial={false}>
            <motion.div
                className={`fixed bottom-0 right-0 m-4 p-4 bg-white rounded-lg shadow-lg ${isVisible ? 'opacity-100' : 'hidden'}`}
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 1, scale: 0.5, transition: { duration: 0.2 } }}>
                {text}
            </motion.div>
        </AnimatePresence>)
}

export default Notification
