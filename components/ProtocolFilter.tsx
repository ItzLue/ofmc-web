import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '../recoil/atoms/users'

type IProps = {
    className?: string
}

const ProtocolFilter: React.FC<IProps> = ({ className = '' }) => {
    const user = useRecoilValue(userState)

    return (
        <div className={`${className} w-full flex justify-center`}>
            <div className='bg-white border rounded-full p-4 w-1/4 font-bold flex justify-between drop-shadow-md'>
                <button className='border-b border-blue-500 rounded-full'>Templates</button>
                <button className='disabled:text-gray-500' disabled={!user}>Created</button>
                <button className='disabled:text-gray-500' disabled={!user}>Public</button>
            </div>
        </div>
    )
}

export default ProtocolFilter
