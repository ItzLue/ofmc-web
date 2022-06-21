import React, { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { IProtocol } from '@/types/protocol'
import { useRouter } from 'next/router'
import { FiTrash } from 'react-icons/fi'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'

type IProps = {
    protocol: IProtocol
    onReFresh: () => void
}

const ProtocolItem: React.FC<IProps> = ({ protocol,onReFresh }) => {

    const [user] = useAuthState(auth)
    const router = useRouter()
    const { urlSlug, isTemplate, uid, isComplete, name, isPublic } = protocol

    const onCopyProtocol = () => {
        axios
            .post('/api/protocols', { ...protocol, userId: user?.uid })
            .then((response) => {
                router.push({
                    pathname: `/protocol/${response.data.protocol.urlSlug}`,
                    query: { id: response.data.protocol.uid},
                })
            })
    }

    const onDelete = (id: string) => {
        axios.delete(`/api/protocols/${id}`)
        onReFresh()
    }


    return (
        <div className='flex max-w-max max-h-max bg-white items-center p-2 border shadow justify-between rounded-lg gap-4' data-cy={protocol.uid}>
            {(user && isTemplate || isPublic) ? (
                <button className='font-medium hover:text-blue-700' onClick={onCopyProtocol}>{name}</button>) : (
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
                {(user && !isTemplate && !isPublic) &&
                    <FiTrash className='text-red-600 w-4 h-4 cursor-pointer' onClick={() => onDelete(uid)} />}
            </div>
        </div>)
}

export default ProtocolItem
