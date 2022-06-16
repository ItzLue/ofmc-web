import type { NextPage } from 'next'
import Head from 'next/head'
import CodeEditor from '@/components/CodeEditor'
import TopNav from '@/components/TopNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Tabs from '@/components/Tabs'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { IFormattedOutput } from '@/types/formattedOutput'
import onCodeChange from '../../helpers/firebase/protocols/on-code-change'
import ofmcSettingsState from '../../recoil/atoms/ofmcSettings'
import AttackSimplified from '@/components/AttackSimplified'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'
import CreateSvg from '@/components/CreateSvg'
import PublishModal from '@/components/Modals/PublishModal'
import NoUserModal from '@/components/Modals/NoUserModal'
import EAPICallState from '@/types/api'

// https://www.codementor.io/@johnnyb/fireedit-real-time-editor-javascript-firebase-59lnmf3c6
const Home: NextPage = () => {
    const [code, setCode] = useState('')
    const [callState, setCallState] = useState<EAPICallState>(EAPICallState.READY)
    const [user] = useAuthState(auth)
    const [result, setResult] = useState<{
        parsed: IFormattedOutput
        raw: string
        attackTraceUrl: string
        svg: string
    }>()
    const [noUserModal, setNoUserModal] = useState(false)
    const [protocolName, setProtocolName] = useState('')
    const [protocolId, setProtocolId] = useState('')
    const [showPublishModal, setShowPublishModal] = useState(false)
    const ofmcSettings = useRecoilValue(ofmcSettingsState)

    const router = useRouter()

    useEffect(() => {
        const id = router.query.id as string
        if (id && router.isReady) {
            setProtocolId(id)
            const template = router.query.template as string
            setCallState(EAPICallState.LOADING)
            axios
                .get(`/api/protocols/${id}`, { params: { template: template || undefined } })
                .then((res) => {
                    setCode(res.data.protocol.userCode || res.data.protocol.startingCode)
                    if (template) {
                        setResult(res.data.attack)
                    }
                    setProtocolName(res.data.protocol.name)
                    setCallState(EAPICallState.SUCCESS)
                })
                .catch(() => setCallState(EAPICallState.ERROR))
        }
        if (!id && router.isReady) router.push('/')
    }, [protocolId, router.query.id, router.isReady, router.query.template, router])

    const onSubmit = async () => {
        setCallState(EAPICallState.LOADING)
        axios
            .post(`/api/protocols/run/${protocolId}`, { code, settings: ofmcSettings })
            .then((res) => {
                setResult(res.data)
                setCallState(EAPICallState.SUCCESS)
            })
            .catch(() => setCallState(EAPICallState.ERROR))
    }

    const onChange = (value: string) => {
        onCodeChange(value, protocolId)
        setCode(value)
    }

    const onPublishProtocol = () => {
        setCallState(EAPICallState.LOADING)
        axios
            .post(`/api/protocols/publish/${protocolId}`)
            .then(() => {
                setShowPublishModal(false)
                setCallState(EAPICallState.SUCCESS)
            })
            .catch(() => setCallState(EAPICallState.ERROR))
    }

    return (
        <div className="flex flex-col gap-6 overflow-y-hidden h-screen bg-primary">
            <Head>
                <title>Ofmc</title>
                <meta name="description" content="Ofmc web interface" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />
            <div className="flex gap-6 flex-shrink h-full px-6">
                <CodeEditor
                    protocolId={protocolId}
                    code={code}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    protocolName={protocolName}
                    showNoUserModal={() => setNoUserModal(true)}
                    isLoading={callState === EAPICallState.LOADING}
                />
                <div className="flex flex-col w-1/2 bg-vs-code overflow-ellipsis">
                    <Tabs
                        isLoading={callState === EAPICallState.LOADING}
                        onPublish={
                            user ? () => setShowPublishModal(true) : () => setNoUserModal(true)
                        }
                        tabs={[
                            {
                                key: '1',
                                label: 'Simplified',
                                content: (
                                    <div className="w-full h-screen text-white overflow-auto">
                                        <AttackSimplified result={result?.parsed} />
                                    </div>
                                ),
                            },
                            {
                                key: '2',
                                label: 'Raw output',
                                content: (
                                    <div className="text-white overflow-auto h-screen">
                                        {result?.raw.split('\n').map((line, i) =>
                                            line ? (
                                                <div className="pl-2" key={i}>
                                                    {line}
                                                </div>
                                            ) : null
                                        )}
                                    </div>
                                ),
                            },
                            {
                                key: '3',
                                label: 'Diagram',
                                content: (
                                    <div className="text-white overflow-auto h-screen bg-vs-code flex items-center">
                                        <div className="w-full h-full flex flex-grow align-middle justify-center">
                                            {result?.parsed.attackTrace && (
                                                <CreateSvg
                                                    attackTrace={result.parsed.attackTrace}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
            <PublishModal
                isOpen={showPublishModal}
                onClose={() => setShowPublishModal(false)}
                onSubmit={onPublishProtocol}
                isLoading={callState === EAPICallState.LOADING}
            />
            <NoUserModal isOpen={noUserModal} onClose={() => setNoUserModal(false)} />
        </div>
    )
}

{
    /* https://codesandbox.io/s/framer-motion-5-1-line-drawing-ph6ln?from-embed=&file=/src/App.js:895-1053  Draw svg cross */
}
export default Home
