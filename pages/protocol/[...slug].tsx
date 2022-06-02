import type { NextPage } from 'next'
import Head from 'next/head'
import CodeEditor from '@/components/CodeEditor'
import TopNav from '@/components/TopNav'
import { useState } from 'react'
import axios from 'axios'
import Tabs from '@/components/Tabs'
import Diagram from '@/components/Diagram'
import Image from 'next/image'
import { IFormattedOutput } from '../../types/formattedOutput'
import { EAPICallstate } from '../../types/api'

const Home: NextPage = () => {
    const [code, setCode] = useState(`Protocol: TLS_pw  # Bounded-verified
# variant without client certificate
# and using a guessable password to authenticate the client

Types: Agent A,B,s;
       Number NA,NB,Sid,PA,PB,PMS;
       Function pk,hash,clientK,serverK,prf,pw

Knowledge: 
A: A,pk(s),B,hash,clientK,serverK,prf,pw(A,B);
B: B,A,pk(B),pk(s),inv(pk(B)),{B,pk(B)}inv(pk(s)),hash,clientK,serverK,prf,pw(A,B)

Actions:

A->B: A,NA,Sid,PA
B->A: NB,Sid,PB,{B,pk(B)}inv(pk(s))
A->B: {PMS}pk(B),
      hash(NB,B,PMS),
      {|hash(prf(PMS,NA,NB),A,B,NA,NB,Sid,PA,PB,PMS),   pw(A,B)  |}
        clientK(NA,NB,prf(PMS,NA,NB))
B->A: {|hash(prf(PMS,NA,NB),A,B,NA,NB,Sid,PA,PB,PMS)|}
        serverK(NA,NB,prf(PMS,NA,NB))
Goals:

B authenticates A on prf(PMS,NA,NB)
A authenticates B on prf(PMS,NA,NB)
prf(PMS,NA,NB) secret between A,B
pw(A,B) guessable secret between A,B`)
    const [result, setResult] = useState<{ parsed: IFormattedOutput, raw: string; attackTraceUrl: string, svg: string }>()
    const [callstate, setCallstate] = useState<EAPICallstate>(EAPICallstate.READY)

    const onSubmit = () => {
        setCallstate(EAPICallstate.LOADING)
        axios
            .get('/api/execute')
            .then((res) => {
                setResult(res.data)
                setCallstate(EAPICallstate.SUCCESS)
            })
            .catch((err) => {
                console.error(err)
                setCallstate(EAPICallstate.ERROR)
            })
    }

    return (
        <div className='flex flex-col gap-6 overflow-y-hidden h-screen bg-primary'>
            <Head>
                <title>Ofmc</title>
                <meta name='description' content='Ofmc web interface' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <TopNav />
            <div className='flex gap-6 h-full px-6'>
                <CodeEditor code={code} onChange={(value) => setCode(value)} onSubmit={onSubmit} />
                <div className='flex flex-col w-full'>
                    <Tabs
                        tabs={[
                            {
                                key: '1',
                                label: 'Simplified',
                                content: (
                                    <div className='w-full h-screen text-white bg-vs-code'>
                                        {result?.parsed.goal}</div>
                                ),
                            },
                            {
                                key: '2', label: 'Raw output',
                                content: (
                                    <div className='text-white overflow-auto h-screen bg-vs-code'>
                                        {result?.raw.split('\n').map((line, i) => (line ?
                                            <div className='pl-2' key={i}>{line}</div> : null))}
                                    </div>
                                ),
                            },
                            {
                                key: '3', label: 'Diagram',
                                content: (
                                    <div className='text-white overflow-auto h-screen bg-vs-code flex items-center'>
                                        {result?.attackTraceUrl &&
                                            <div className='w-full h-full'>
                                                <Image src={result.attackTraceUrl} alt='Picture of the author'
                                                       layout='fixed' height={500} width={500}/>
                                            </div>}
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
{/*https://codesandbox.io/s/framer-motion-5-1-line-drawing-ph6ln?from-embed=&file=/src/App.js:895-1053  Draw svg cross*/}
export default Home
