import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import Modal from '@/components/Modals/Modal'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Hero from '@/components/Hero'
import { userState } from '../recoil/atoms/users'
import { ICreateProtocol, IProtocol } from '@/types/protocol'
import ProtocolTabs from '@/components/ProtocolTabs'
import ProtocolOverview from '@/components/ProtocolOverview'

type IProps = {
    templates: IProtocol[]
}

const Home: NextPage<IProps> = ({ templates }) => {
    const user = useRecoilValue(userState)
    const [isOpen, setIsOpen] = useState(false)
    const [protocols, setProtocols] = useState<IProtocol[]>(templates)

    const { register, handleSubmit } = useForm<ICreateProtocol>()

    const router = useRouter()

    const onSubmit: SubmitHandler<ICreateProtocol> = (data) => {
        axios.post('/api/protocols', { ...data, userId: user?.uid }).then((response) => {
            router.push({
                pathname: `/protocol/${response.data.protocol.urlSlug}`,
                query: {
                    id: response.data.protocol.uid,
                },
            })
        })
    }

    const fetchProtocols = useCallback(() => {
        if (user) {
            axios.get(`/api/protocols`, { params: { userId: user.uid } }).then((r) => {
                setProtocols(r.data.protocols)
            })
        }
    }, [user])

    useEffect(() => {
        fetchProtocols()
    }, [user, protocols, fetchProtocols])

    const getMostCompletedType = (arr: IProtocol[]): string => {
        const newArray = [...arr]
        return newArray
            .filter((protocol) => protocol.isComplete)
            .sort(
                (a, b) =>
                    newArray.filter((p) => p === a).length -
                    newArray.filter((p) => p === b).length,
            )
            .pop()?.type || 'none'
    }

    return (
        <div className='h-screen w-screen'>
            <Hero
                mostCompletedType={getMostCompletedType(protocols)}
                totalCompleted={protocols.filter((p) => p.isComplete).length}
                userCreatedProtocols={protocols.filter((p) => !p.isTemplate).length}
            />
            <main className='px-12'>
                {user && <button onClick={() => setIsOpen(true)}>Create new protocol </button>}
                <ProtocolTabs />
                <ProtocolOverview protocols={protocols} templates={templates} />

                {user && (
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
                                            <input {...register('name')} />
                                            <label
                                                className='block text-sm font-medium leading-5 text-gray-700'
                                                htmlFor='type'
                                            >
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

                                        <div className='mt-4'></div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Modal>
                )}
            </main>
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await axios.get('http://localhost:3000/api/templates')
    return { props: { templates: res.data.protocols } }
}

export default Home
