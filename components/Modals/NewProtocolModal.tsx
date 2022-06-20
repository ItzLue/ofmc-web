import Modal from '@/components/Modals/Modal'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { ICreateProtocol } from '@/types/protocol'


type IProps = {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ICreateProtocol) => void
}
const NewProtocolModal: React.FC<IProps> = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateProtocol>()

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
                                Create new protocol
                            </Dialog.Title>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className='flex flex-col gap-2'
                            >
                                <label
                                    className='block text-sm font-medium leading-5 text-gray-700'
                                    htmlFor='name'
                                >
                                    Name
                                </label>
                                <input {...register('name', { required: true })} />
                                <span className="text-red-700">{errors.name && 'Name is required'}</span>
                                <label
                                    className='block text-sm font-medium leading-5 text-gray-700'
                                    htmlFor='type'
                                >
                                    Type
                                </label>
                                <input {...register('type', { required: true })} />
                                <span className="text-red-700">{errors.type && 'Type is required'}</span>
                                <button
                                    type='submit'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                >
                                    Create
                                </button>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Modal>
    )

}

export default NewProtocolModal
