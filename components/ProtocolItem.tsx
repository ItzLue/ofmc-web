import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { IProtocol } from '@/types/protocol'
import { useRecoilValue } from 'recoil'
import { userState } from '../recoil/atoms/users'
import { useRouter } from 'next/router'

type IProps = {
    protocol: IProtocol
}

const ProtocolItem: React.FC<IProps> = ({ protocol }) => {

    const user = useRecoilValue(userState)
    const router = useRouter()
    const { urlSlug, isTemplate, uid, isComplete, name } = protocol

    const onClickTemplate = () => {
        axios.post('/api/protocols', { ...protocol, userId: user?.uid }).then((response) => {
            router.push({
                pathname: `/protocol/${response.data.protocol.urlSlug}`,
                query: {
                    id: response.data.protocol.uid,
                },
            })
        })
    }
    return (
        <div className='flex w-full h-8 bg-white items-center p-2 border shadow justify-between rounded-lg'>
            {isTemplate ? (
                <button className='font-medium hover:text-blue-700' onClick={onClickTemplate}>{name}</button>) : (
                <Link className='' href={`protocol/${urlSlug}?id=${uid}`}>
                    <a className='font-medium hover:text-blue-700'>{name}</a>
                </Link>)}
            <div className={`rounded-full p-2 border  ${isComplete ? 'bg-green-600' : 'bg-white'}`} />
        </div>)

}

export default ProtocolItem
