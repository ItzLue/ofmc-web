import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { IProtocol } from '@/types/protocol'
import { useRecoilValue } from 'recoil'
import { userState } from '../recoil/atoms/users'
import { useRouter } from 'next/router'
import { FiTrash } from 'react-icons/fi'

type IProps = {
    protocol: IProtocol
}

const ProtocolItem: React.FC<IProps> = ({ protocol }) => {

    const user = useRecoilValue(userState)
    const router = useRouter()
    const { urlSlug, isTemplate, uid, isComplete, name } = protocol

    const onClickTemplate = () => {
        axios
            .post('/api/protocols', { ...protocol, userId: user?.uid })
            .then((response) => {
                router.push({
                    pathname: `/protocol/${response.data.protocol.urlSlug}`,
                    query: {
                        id: response.data.protocol.uid},
                })
            })
    }

    const onDelete = (id: string) => {
        axios.delete(`/api/protocols/${id}`)
            .then(() => console.log('deleted', id))
    }

    return (
        <div className='flex w-1/4 h-8 bg-white items-center p-2 border shadow justify-between rounded-lg'>
            {(isTemplate && user) ? (
                <button className='font-medium hover:text-blue-700' onClick={onClickTemplate}>{name}</button>) : (
                <Link href={{
                    pathname: `/protocol/${urlSlug}`,
                    query: {
                            id: uid,
                        template: isTemplate,
                    },
                }}>
                    <a className='font-medium hover:text-blue-700'>{name}</a>
                </Link>)}
            <div className='flex gap-4 items-center'>
                <div className='rounded-full bg-blue-300 px-2 text-white select-none'>{protocol.type}</div>
                <div className={`rounded-full p-2 border h-1/3 ${isComplete ? 'bg-green-600' : 'bg-white'}`} />
                {(user && !isTemplate) &&
                    <FiTrash className='text-red-600 w-4 h-4 cursor-pointer' onClick={() => onDelete(uid)} />}
            </div>
        </div>)
}

export default ProtocolItem
