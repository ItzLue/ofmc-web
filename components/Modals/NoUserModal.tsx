import React, { Fragment, useState } from 'react'
import { EAPICallState } from '@/types/api'
import {
    useCreateUserWithEmailAndPassword,
    useSendEmailVerification,
    useSignInWithGithub,
    useUpdateProfile,
} from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'
import Modal from '@/components/Modals/Modal'
import { NextPage } from 'next'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'
import { browserSessionPersistence, setPersistence } from '@firebase/auth'
import { useRouter } from 'next/router'

type IProps = {
    isOpen: boolean
    onClose: () => void
}

const NoUserModal: NextPage<IProps> = ({ isOpen, onClose }) => {
    const router = useRouter()

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
            router.push('/')
        })
    }

    const [signInWithGitHub, userGithub, loadingGithub, errorGithub] = useSignInWithGithub(auth)

    const onSignInGithub = () => {
        signInWithGitHub().then(() => {
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
                                Please sign up, to use this feature
                            </Dialog.Title>

                            <form onSubmit={handleSubmit(onSignUp)} className="flex flex-col gap-4">
                                <label htmlFor="username">Username</label>
                                <input type="text" {...register('username')} />

                                <label htmlFor="email">Email</label>
                                <input type="email" {...register('email')} />
                                <label htmlFor="password">Password</label>
                                <input type="password" {...register('password')} />
                                <button
                                    type="submit"
                                    data-cy='sign-up-button'
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Sign up
                                </button>
                                {error && <p>{error.message}</p>}
                            </form>

                            <div className="mt-4 flex justify-center">
                                <div
                                    className="w-full inline-flex gap-2 justify-center border border rounded-md border-black py-2 cursor-pointer hover:bg-gray-200"
                                    onClick={onSignInGithub}
                                >
                                    <AiFillGithub className="h-6 w-6" />
                                    <span>Sign in with Github</span>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Modal>
    )
}

export default NoUserModal
