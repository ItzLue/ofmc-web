import React, { Fragment } from 'react'
import {
    useSendEmailVerification,
    useSignInWithEmailAndPassword,
    useSignInWithGithub,
} from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'
import Modal from '@/components/Modals/Modal'
import { NextPage } from 'next'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { AiFillGithub } from 'react-icons/ai'

type IProps = {
    isOpen: boolean
    onClose: () => void
}

const LoginModal: NextPage<IProps> = ({ isOpen, onClose }) => {
    const [signInWithEmailAndPassword, userSignIn, loadingSignIn, errorLogin] =
        useSignInWithEmailAndPassword(auth)

    const [signInWithGitHub, user, loading, error] = useSignInWithGithub(auth)

    const { register, handleSubmit } = useForm<{ email: string; password: string }>()

    const onSignInEmail = (data: { email: string; password: string }) => {
        signInWithEmailAndPassword(data.email, data.password).then(async () => {
            onClose()
        })
    }

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
                                Sign In
                            </Dialog.Title>

                            <form
                                onSubmit={handleSubmit(onSignInEmail)}
                                className="flex flex-col gap-4"
                            >
                                <label htmlFor="email">Email</label>
                                <input type="email" id='email' {...register('email')} />
                                <label htmlFor="password">Password</label>
                                <input type="password" id='password' {...register('password')} />
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    Sign in
                                </button>
                                {errorLogin && <p>{errorLogin.message}</p>}
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

export default LoginModal
