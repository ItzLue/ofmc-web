import React, { Fragment, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import { EProtocolType } from '@/pages/api/templates'
import ProtocolItemList from '@/components/ProtocolItemList'
import { browserSessionPersistence, GithubAuthProvider, setPersistence, signInWithPopup } from '@firebase/auth'
import { useRecoilState } from 'recoil'
import { userState } from '../recoil/atoms/users'
import { ICreateProtocol, IProtocol } from '../types/protocol'
import { auth, provider } from '../helpers/firebase/firebase'
import writeNewUser from '../helpers/firebase/create-new-user'
import { Dialog, Transition } from '@headlessui/react'
import Modal from '@/components/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'


type IProps = {
    templates: IProtocol[]
}

const Home: NextPage<IProps> = ({ templates }) => {
    const [user, setUser] = useRecoilState(userState)
    const [isOpen, setIsOpen] = useState(false)

    const { register, handleSubmit } = useForm<ICreateProtocol>()

    const router = useRouter()

    const onSignIn = async () => {
        await setPersistence(auth, browserSessionPersistence)
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                writeNewUser(user)
                setUser(user)
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.customData.email
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error)
        })
    }

    const onSubmit: SubmitHandler<ICreateProtocol> = (data) => {
        axios.post('/api/protocols', { ...data, userId: user?.uid })
            .then((response) => {
                router.push({
                    pathname: `/protocol/${response.data.protocol.urlSlug}`,
                    query: {
                        id: response.data.protocol.uid,
                    },
                })
            })
    }


    return (
        <div className='h-screen w-screen px-12'>
            {!user && <button className='text-blue-500' onClick={onSignIn}>Sign in to Github</button>}
            {user && (
                <div className='flex justify-center text-white w-full'>
                    <button className='bg-blue-800 p-4 rounded-lg' onClick={() => setIsOpen(true)}>Create protocol
                    </button>
                </div>
            )}
            <div className='grid grid-cols-4 gap-8'>
                <ProtocolItemList files={templates} />
                <ProtocolItemList files={templates} />
                <ProtocolItemList files={templates} />
                <ProtocolItemList files={templates} />
            </div>
            {user && <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
                                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                                    <label className='block text-sm font-medium leading-5 text-gray-700' htmlFor='name'>
                                        Name
                                    </label>
                                    <input {...register('name')} />
                                    <label className='block text-sm font-medium leading-5 text-gray-700' htmlFor='type'>
                                        Type
                                    </label>
                                    <input {...register('type')} />
                                    <button
                                        type='submit'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                    >
                                        Create
                                    </button>
                                </form>

                                <div className='mt-4'>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Modal>}
        </div>)

}

export const getStaticProps = async () => {
    const res = await axios.get('http://localhost:3000/api/protocols')
    return { props: { templates: res.data.protocols } }
}

export default Home
