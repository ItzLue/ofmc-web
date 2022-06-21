import React, { Fragment } from 'react'
import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification,
    useUpdateProfile,
} from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'
import Modal from '@/components/Modals/Modal'
import { NextPage } from 'next'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { browserSessionPersistence, setPersistence } from '@firebase/auth'

type IProps = {
    isOpen: boolean
    onClose: () => void
}

const SignUpModal: NextPage<IProps> = ({ isOpen, onClose }) => {
    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth)

    const [updateProfile, updating, updateError] = useUpdateProfile(auth)

    const [sendEmailVerification, sending, EmailVerificationError] = useSendEmailVerification(auth)

    const { register, handleSubmit } = useForm<{
        username: string
        email: string
        password: string
    }>()

    const onSignUp = async (data: { username: string; email: string; password: string }) => {
        await setPersistence(auth, browserSessionPersistence)

        createUserWithEmailAndPassword(data.email, data.password).then(async () => {
            await updateProfile({
                displayName: data.username,
            })
            await sendEmailVerification()
            onClose()
        })
    }

    return (
        <Modal title="Login" isOpen={isOpen} onClose={onClose}>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 mb-2"
                            >
                                Sign Up
                            </Dialog.Title>

                            <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col gap-4">
                                <label htmlFor="Username">Username</label>
                                <input type="text" id="username" {...register('username')} />
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" {...register('email')} />
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" {...register('password')} />
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Sign up
                                </button>
                                {error && <p>{error.message}</p>}
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Modal>
    )
}

export default SignUpModal
