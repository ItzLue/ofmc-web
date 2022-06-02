import React from 'react'
import { EProtocolType, getProtocolName, IFiles } from '@/pages/api/templates'
import ProtocolItem from '@/components/ProtocolItem'

type IProps = {
    files: IFiles[]
    type: EProtocolType
}

const ProtocolItemList: React.FC<IProps> = ({ files, type }) => {

    const filteredFiles = files.filter(file => file.type === type)

    return (
        <div className='flex flex-col gap-4 items-center'>
            <h2 className='font-bold text-xl'>{getProtocolName(type)} {filteredFiles.filter((i) => i.isComplete).length} / {filteredFiles.length}</h2>
            {filteredFiles.map((template) => (
                <ProtocolItem name={template.name} urlSlug={template.urlSlug} isComplete={template.isComplete}
                              key={template.id} />
            ))}
        </div>
    )

}

export default ProtocolItemList
