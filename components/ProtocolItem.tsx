import React from 'react'
import Link from 'next/link'

type IProps = {
    name: string
    urlSlug: string
    isComplete: boolean
    uid: string
}

const ProtocolItem: React.FC<IProps> = ({ name, urlSlug,isComplete,uid }) => {
    return (
        <div className='flex w-full h-8 bg-white items-center p-2 border shadow justify-between rounded-lg'>
            <Link className='' href={`protocol/${urlSlug}?id=${uid}`}>
                <a className='font-medium hover:text-blue-700'>{name}</a>
            </Link>
            <div className={`rounded-full p-2 border  ${isComplete ? 'bg-green-600' : 'bg-white'}`} />
        </div>)

}

export default ProtocolItem
