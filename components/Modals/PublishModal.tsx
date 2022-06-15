import Modal from '@/components/Modals/Modal'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

type IProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: () => void
}

const NewProtocolModal: React.FC<IProps> = ({ isOpen, onClose, onSubmit }) => {

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
                            className='w-full max-w-md transform overflow-hidden flex flex-col gap-4 rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                            <Dialog.Title
                                as='h3'
                                className='text-lg text-center font-medium leading-6 text-gray-900'
                            >
                                Publish Protocol
                            </Dialog.Title>
                            <div>
                                <span>Your protocol will be public and accessible for every user</span>
                            </div>
                            <div className="flex justify-around">
                                <button
                                    type='button'
                                    onClick={onSubmit}
                                    className='inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                >
                                    Publish
                                </button>
                                <button onClick={onClose} className="rounded-md border-transparent bg-gray-400 text-white border px-4 py-2 text-sm font-medium hover:bg-gray-500">Cancel</button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Modal>
    )

}

export default NewProtocolModal
