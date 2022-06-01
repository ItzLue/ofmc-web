import type { NextPage } from 'next'
import Head from 'next/head'
import CodeEditor from '@/components/CodeEditor'
import TopNav from '@/components/TopNav'
import { useState } from 'react'
import axios from 'axios'
import Tabs from '@/components/Tabs'

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
    const [result, setResult] = useState('')

    const onSubmit = () => {
        axios
            .get('/api/execute')
            .then((res) => setResult(res.data.message))
            .catch((err) => console.error(err))
    }

    return (
        <div className="flex flex-col gap-6 overflow-y-hidden" style={{ height: '100vh' }}>
            <Head>
                <title>Ofmc</title>
                <meta name="description" content="Ofmc web interface" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TopNav />
            <div className="flex gap-6 h-full p-12">
                <CodeEditor code={code} onChange={(value) => setCode(value)} onSubmit={onSubmit} />
                <div className="flex flex-col w-full">
                    <Tabs
                        tabs={[
                            {
                                key: '1',
                                label: 'Raw output',
                                content: (
                                    <div className="w-full h-full text-white mt-4">{result}</div>
                                ),
                            },
                            { key: '2', label: 'Simple' },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
