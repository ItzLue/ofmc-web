import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../recoil/atoms/users'
import { Tab } from '@headlessui/react'
import selectedTabState from '../recoil/atoms/tabs'
import { NextPage } from 'next'

const ProtocolTabs: NextPage = () => {
    const user = useRecoilValue(userState)
    const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState)

    return (
        <div className="w-full flex justify-center">
            <Tab.Group
                onChange={(selected) => setSelectedTab(selected)}
                selectedIndex={selectedTab}
            >
                <Tab.List className="flex space-x-6 rounded-full border shadow px-4">
                    <Tab className={`tab ${selectedTab === 0 ? 'text-blue-500 font-bold scale-105' : ''}`}>Templates</Tab>
                    <Tab className={`tab ${selectedTab === 1 ? 'text-blue-500 font-bold scale-105' : ''}`} disabled={!user}>
                        Created
                    </Tab>
                    <Tab className={`tab ${selectedTab === 2 ? 'text-blue-500 font-bold' : ''}`} disabled>
                        Public
                    </Tab>
                </Tab.List>
            </Tab.Group>
        </div>
    )
}

export default ProtocolTabs
