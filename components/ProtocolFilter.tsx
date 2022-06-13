import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../recoil/atoms/users'
import { Tab } from '@headlessui/react'
import selectedTabState from '../recoil/atoms/tabs'
import { NextPage } from 'next'

const ProtocolFilter: NextPage = () => {
    const user = useRecoilValue(userState)
    const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)

    return (
        <div className="w-full flex justify-center">
            <Tab.Group
                onChange={(selected) => {
                    setSelectedTab(selected)
                }}
                selectedIndex={selectedTab}
            >
                <Tab.List className="flex space-x-4 rounded-xl bg-blue-900/20 p-1">
                    <Tab className={`tab ${selectedTab === 0 && 'selected'}`}>Templates</Tab>
                    <Tab className={`tab ${selectedTab === 1 && 'selected'}`} disabled={!user}>
                        Created
                    </Tab>
                    <Tab className={`tab ${selectedTab === 2 && 'selected'}`} disabled>
                        Public
                    </Tab>
                </Tab.List>
            </Tab.Group>
        </div>
    )
}

export default ProtocolFilter
