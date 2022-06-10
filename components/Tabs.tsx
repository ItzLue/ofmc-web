import { NextPage } from 'next'
import { useState } from 'react'
import { ITab } from '@/types/tabs'

type IProps = {
    className?: string
    tabs: ITab[]
    defaultTab?: string
}

const Tabs: NextPage<IProps> = ({ className = '', tabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab ?? '1')

    return (
        <div>
            <nav
                className={`${className} bg-gray-800 text-white flex gap-6 w-full h-8 rounded-tl-lg rounded-tr-lg overflow-y-hidden overflow-x-hidden items-center`}
            >
                {tabs.map((tab) => (
                    <button
                        className={`flex-shrink-0 bg-transparent m-0 p-3 border-0 ${
                            activeTab === tab.key ? 'font-medium bg-[#1e1e1e]' : ''
                        } ${
                            tab.disabled
                                ? 'text-gray-200 font-normal cursor-default'
                                : 'cursor-pointer hover:text-amber-600'
                        }`}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        key={tab.key}
                        disabled={tab.disabled}
                    >
                        {tab.label}
                    </button>
                ))}
                <div className="h-2px bg-blue-700 absolute bottom-0 left-0 transition-all duration-300 ease-in-out" />
            </nav>
            {tabs.find((tab) => tab.key === activeTab)?.content}
        </div>
    )
}

export default Tabs
