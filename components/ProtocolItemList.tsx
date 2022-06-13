import React from 'react'
import ProtocolItem from '@/components/ProtocolItem'
import { IProtocol } from '@/types/protocol'

type IProps = {
    protocols: IProtocol[]
}

const ProtocolItemList: React.FC<IProps> = ({ protocols }) => {

    return (
        <div className='my-8 flex flex-wrap gap-4 items-center'>
            {protocols.map((protocol) => (
                <ProtocolItem protocol={protocol} />
            ))}
        </div>
    )
}

export default ProtocolItemList
