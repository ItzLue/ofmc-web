import React from 'react'
import { EProtocolType, getProtocolName } from '@/pages/api/templates'
import ProtocolItem from '@/components/ProtocolItem'
import { IProtocol } from '../types/protocol'

type IProps = {
    files: IProtocol[]
}

const ProtocolItemList: React.FC<IProps> = ({ files }) => {


    return (
        <div className='flex flex-col gap-4 items-center'>
            <h2 className='font-bold text-xl'> {files.filter((i) => i.isComplete).length} / {files.length}</h2>
            {files.map((file) => (
                <ProtocolItem name={file.name} urlSlug={file.urlSlug} isComplete={file.isComplete}
                              key={file.uid} uid={file.uid} />
            ))}
        </div>
    )

}

export default ProtocolItemList
