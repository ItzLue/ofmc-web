import type { NextPage } from 'next'
import Head from 'next/head'
import CodeEditor from '@/components/CodeEditor'
import TopNav from '@/components/TopNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Tabs from '@/components/Tabs'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import { useRouter } from 'next/router'
import { IFormattedOutput } from '../../types/formattedOutput'
import { EAPICallstate } from '../../types/api'
import { userState } from '../../recoil/atoms/users'
import { onCodeChange } from '../../helpers/firebase/protocols/on-code-change'

// https://www.codementor.io/@johnnyb/fireedit-real-time-editor-javascript-firebase-59lnmf3c6
const Home: NextPage = () => {
    const [code, setCode] = useState('')

    const user = useRecoilValue(userState)
    const [result, setResult] = useState<{
        parsed: IFormattedOutput
        raw: string
        attackTraceUrl: string
        svg: string
    }>()
    const [callstate, setCallstate] = useState<EAPICallstate>(EAPICallstate.READY)
    const [noUserModal, setNoUserModal] = useState(false)
    const [protocolId, setProtocolId] = useState('')

    const router = useRouter()

    useEffect(() => {
        const id = router.query.id as string
        if (id && router.isReady) {
            setProtocolId(id)
            setCallstate(EAPICallstate.LOADING)
            axios.get(`/api/protocols/${id}`).then((res) => {
                setCode(res.data.protocol.userCode || res.data.protocol.startingCode)
            })
        }
    }, [protocolId, router.query.id, router.isReady])

    const onSubmit = () => {
        setCallstate(EAPICallstate.LOADING)

        axios
            .post(
                `/api/protocols/run/${protocolId}`,
                { code },
                {
                    headers: {
                        authorization: `Bearer ${user
                            ?.getIdTokenResult()
                            .then((idTokenResult) => idTokenResult.token)}`,
                    },
                }
            )
            .then((res) => {
                setResult(res.data)
                setCallstate(EAPICallstate.SUCCESS)
            })
            .catch((err) => {
                console.error(err)
                setCallstate(EAPICallstate.ERROR)
            })
    }

    useEffect(() => {
        if (!user) {
            setNoUserModal(true)
        }
    }, [user])

    return (
        <div className="flex flex-col gap-6 overflow-y-hidden h-screen bg-primary">
            <Head>
                <title>Ofmc</title>
                <meta name="description" content="Ofmc web interface" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />
            <div className="flex gap-6 h-full px-6">
                <CodeEditor
                    code={code}
                    onChange={(value) => onCodeChange(value, protocolId)}
                    onSubmit={onSubmit}
                />
                <div className="flex flex-col w-full">
                    <Tabs
                        tabs={[
                            {
                                key: '1',
                                label: 'Simplified',
                                content: (
                                    <div className="w-full h-screen text-white bg-vs-code">
                                        {result?.parsed.goal}
                                    </div>
                                ),
                            },
                            {
                                key: '2',
                                label: 'Raw output',
                                content: (
                                    <div className="text-white overflow-auto h-screen bg-vs-code">
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
                                        {result?.attackTraceUrl && (
                                            <div className="w-full h-full">
                                                <Image
                                                    src={result.attackTraceUrl}
                                                    alt="Picture of the author"
                                                    layout="fixed"
                                                    height={500}
                                                    width={500}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
{
    /* https://codesandbox.io/s/framer-motion-5-1-line-drawing-ph6ln?from-embed=&file=/src/App.js:895-1053  Draw svg cross */
}
export default Home
