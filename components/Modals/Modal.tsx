import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

type IProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
}


const Modal: React.FC<IProps> = ({ isOpen, onClose, title, children }) => {

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>
                    {children}
                </Dialog>
            </Transition>
        </>)
}

export default Modal
