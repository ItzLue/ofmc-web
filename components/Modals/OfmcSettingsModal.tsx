import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Modal from '@/components/Modals/Modal'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import ofmcSettingsState from '../../recoil/atoms/ofmcSettings'

export type IOFMCSettings = {
    numSess: number
    depth: number
}

type IProps = {
    isOpen: boolean
    onClose: () => void
}
const OfmcSettingsModal: React.FC<IProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit } = useForm<IOFMCSettings>({
        defaultValues: { numSess: 2, depth: 0 },
    })
    const setOfmcSettings = useSetRecoilState(ofmcSettingsState)

    const onSubmit = (data: IOFMCSettings) => {
        setOfmcSettings(data)
        onClose()
    }
    return (
        <Modal title='Ofmc settings' isOpen={isOpen} onClose={onClose}>
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
                                Ofmc settings
                            </Dialog.Title>
                            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                                <label htmlFor='numSess'>Number of sessions</label>
                                <input
                                    defaultValue={2}
                                    type='number'
                                    min={1}
                                    {...register('numSess')}
                                />

                                <label htmlFor='depth'>Depth (0 for infinite)</label>
                                <input
                                    defaultValue={0}
                                    type='number'
                                    min={1}
                                    {...register('depth')}
                                />
                                <button
                                    type='submit'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                >
                                    Update
                                </button>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Modal>
    )
}

export default OfmcSettingsModal
