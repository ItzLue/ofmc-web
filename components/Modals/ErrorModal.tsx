import Modal from '@/components/Modals/Modal'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'


type IProps = {
    isOpen: boolean
    onClose: () => void
}
const ErrorModal: React.FC<IProps> = ({ isOpen, onClose }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                    >
                        <Dialog.Panel
                            className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg font-medium leading-6 text-gray-900 mb-2'
                            >
                                Fejl
                            </Dialog.Title>
                            <p>
                                Noget gik galt, prøv igen senere.
                            </p>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Modal>
    )

}

export default ErrorModal
