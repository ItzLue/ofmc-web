import React from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import { EProtocolType, IFiles } from '@/pages/api/templates'
import ProtocolItemList from '@/components/ProtocolItemList'

type IProps = {
    templates: IFiles[]
}
const Home: NextPage<IProps> = ({ templates }) => {

    return (
        <div className='h-screen w-screen px-12'>
            <div className='grid grid-cols-4 gap-8'>
                <ProtocolItemList files={templates} type={EProtocolType.CLASSIC}/>
                <ProtocolItemList files={templates} type={EProtocolType.SYMKEYNOTTP}/>
                <ProtocolItemList files={templates} type={EProtocolType.AUTHCFF}/>
                <ProtocolItemList files={templates} type={EProtocolType.PUBKEYNOTTP}/>
            </div>
        </div>)

}

export const getStaticProps = async () => {
    const res = await axios.get('http://localhost:3000/api/templates')
    return { props: { templates: res.data } }
}

export default Home
