import React from 'react'
import { useRecoilState } from 'recoil'
import { Tab } from '@headlessui/react'
import selectedProtocolTab from '../recoil/atoms/tabs'
import { NextPage } from 'next'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'

const ProtocolTabs: NextPage = () => {
    const [user] = useAuthState(auth)
    const [selectedTab, setSelectedTab] = useRecoilState(selectedProtocolTab)

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
                    <Tab className={`tab ${selectedTab === 2 ? 'text-blue-500 font-bold' : ''}`} disabled={!user}>
                        Public
                    </Tab>
                </Tab.List>
            </Tab.Group>
        </div>
    )
}

export default ProtocolTabs
