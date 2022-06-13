import React from 'react'
import { IProtocol } from '@/types/protocol'
import ProtocolItemList from '@/components/ProtocolItemList'
import { useRecoilValue } from 'recoil'
import selectedTabState from '../recoil/atoms/tabs'

type IProps = {
    protocols: IProtocol[]
    templates: IProtocol[]
}
const ProtocolOverview: React.FC<IProps> = ({ protocols, templates }) => {
    const selectedTab = useRecoilValue(selectedTabState)

    return (
        <div className="grid grid-cols-4 gap-8">
            {selectedTab === 0 && <ProtocolItemList type="Classic" protocols={templates} />}
            {selectedTab === 1 && <ProtocolItemList type="Classic" protocols={protocols} />}
        </div>
    )
}
export default ProtocolOverview
