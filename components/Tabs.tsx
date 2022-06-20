import { NextPage } from 'next'
import { ITab } from '@/types/tabs'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRecoilState } from 'recoil'
import attackTabState from '../recoil/atoms/attackTab'

type IProps = {
    className?: string
    tabs: ITab[]
    defaultTab?: string
    onPublish?: () => void
    isLoading: boolean
}

const Tabs: NextPage<IProps> = ({ className = '', tabs, defaultTab, onPublish, isLoading }) => {
    const [activeTab, setActiveTab] = useRecoilState(attackTabState)

    return (
        <div>
            <nav
                className={`${className} bg-gray-800 text-white flex gap-6 w-full h-8 rounded-tl-lg rounded-tr-lg overflow-y-hidden overflow-x-hidden items-center`}
            >
                <div className="flex w-full justify-between">
                    <div>
                        {tabs.map((tab) => (
                            <Button
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
                            </Button>
                        ))}
                    </div>
                    {onPublish && (
                        <Button
                            loading={isLoading}
                            type="button"
                            onClick={onPublish}
                            className="p-2 bg-green-700 rounded-tr-lg hover:bg-green-900"
                        >
                            Publish
                        </Button>
                    )}
                </div>
            </nav>
            <Loader iconClass="text-4xl mt-32" loading={isLoading}>
                {tabs.find((tab) => tab.key === activeTab)?.content}
            </Loader>
        </div>
    )
}

export default Tabs
