import React from 'react'
import ProtocolItem from '@/components/ProtocolItem'
import { IProtocol } from '@/types/protocol'

type IProps = {
    type: string
    protocols: IProtocol[]
}

const ProtocolItemList: React.FC<IProps> = ({ type, protocols }) => {

    return (
        <div className='flex flex-col gap-4 items-center'>
            <h2 className='font-bold text-xl'>
                {type} {protocols.filter((i) => i.isComplete).length} / {protocols.length}
            </h2>
            {protocols.map((protocol) => (
                <ProtocolItem protocol={protocol} />
            ))}
        </div>
    )
}

export default ProtocolItemList
