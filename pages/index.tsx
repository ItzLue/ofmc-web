import React, { useCallback, useEffect, useState } from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import { SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import Hero from '@/components/Hero'
import { ICreateProtocol, IProtocol } from '@/types/protocol'
import ProtocolTabs from '@/components/ProtocolTabs'
import ProtocolOverview from '@/components/ProtocolOverview'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'
import LoginModal from '@/components/Modals/LoginModal'
import SignupModal from '@/components/Modals/SignupModal'
import NewProtocolModal from '@/components/Modals/NewProtocolModal'
import { AiFillPlusCircle } from 'react-icons/ai'

type IProps = {
    templates: IProtocol[]
}

const Home: NextPage<IProps> = ({ templates }) => {
    // const user = useRecoilValue(userState)
    const [user] = useAuthState(auth)
    const [privateProtocols, setPrivateProtocols] = useState<IProtocol[]>(templates)
    const [publicProtocols, setPublicProtocols] = useState<IProtocol[]>([])
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showCreateProtocolModal, setShowCreateProtocolModal] = useState(false)

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
        axios.get(`/api/protocols`, { params: { userId: user?.uid } }).then((r) => {
            setPrivateProtocols(r.data.private)
            setPublicProtocols(r.data.public)
        })
    }, [user])

    useEffect(() => {
        if (user) fetchProtocols()
    }, [fetchProtocols])

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
                mostCompletedType={getMostCompletedType(privateProtocols)}
                totalCompleted={privateProtocols.filter((p) => p.isComplete).length}
                userCreatedProtocols={privateProtocols.filter((p) => !p.isTemplate).length}
                onOpenLoginModal={() => setShowLoginModal(true)}
                onOpenSignUpModal={() => setShowSignUpModal(true)}
            />
            <main className='px-12'>
                <div className="flex mt-6 justify-center items-center">
                    {user && <AiFillPlusCircle className="text-3xl cursor-pointer h-8 w-8 text-blue-500 hover:text-blue-700" onClick={() => setShowCreateProtocolModal(true)} />}
                    <ProtocolTabs />
                </div>
                <ProtocolOverview onRefresh={() => fetchProtocols()} privateProtocols={privateProtocols}
                                  templates={templates} publicProtocols={publicProtocols} />
                {user && (
                    <NewProtocolModal isOpen={showCreateProtocolModal} onClose={() => setShowCreateProtocolModal(false)}
                                      onSubmit={onSubmit} />)}
                <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
                <SignupModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} />
            </main>
        </div>
    )
}

export const getStaticProps = async () => {
    const res = await axios.get('http://localhost:3000/api/templates')
    return { props: { templates: res.data.protocols } }
}

export default Home
