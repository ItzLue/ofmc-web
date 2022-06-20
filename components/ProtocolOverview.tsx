import React from 'react'
import { IProtocol } from '@/types/protocol'
import ProtocolItemList from '@/components/ProtocolItemList'
import { useRecoilValue } from 'recoil'
import selectedProtocolTab from '../recoil/atoms/tabs'

type IProps = {
    privateProtocols: IProtocol[]
    templates: IProtocol[]
    publicProtocols: IProtocol[]
    onRefresh: () => void
}
const ProtocolOverview: React.FC<IProps> = ({ privateProtocols, templates, onRefresh,publicProtocols }) => {
    const selectedTab = useRecoilValue(selectedProtocolTab)

    return (
        <div className="grid grid-flow-col-dense gap-8">
            {selectedTab === 0 && <ProtocolItemList onRefresh={onRefresh} protocols={templates} />}
            {selectedTab === 1 &&<ProtocolItemList onRefresh={onRefresh} protocols={privateProtocols} />}
            {selectedTab === 2 && <ProtocolItemList onRefresh={onRefresh} protocols={publicProtocols} />}
        </div>
    )
}
export default ProtocolOverview
