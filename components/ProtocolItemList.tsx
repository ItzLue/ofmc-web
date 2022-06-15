import React from 'react'
import ProtocolItem from '@/components/ProtocolItem'
import { IProtocol } from '@/types/protocol'

type IProps = {
    protocols: IProtocol[]
    onRefresh: () => void
}

const ProtocolItemList: React.FC<IProps> = ({ protocols, onRefresh }) => {

    return (
        <div className='my-8 flex flex-wrap gap-4 items-center'>
            {protocols.map((protocol) => (
                <ProtocolItem onReFresh={onRefresh} protocol={protocol} />
            ))}
        </div>
    )
}

export default ProtocolItemList
