import EAPICallState from '@/types/api'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

type IProps = {
    loading?: boolean
    wrapperClass?: string
    iconClass?: string
    innerClass?: string
    APIStates?: EAPICallState[]
    isAbsolute?: boolean
    children?: React.ReactNode
}

const Loader: React.FC<IProps> = ({
    children,
    loading = false,
    wrapperClass = '',
    iconClass = '',
    APIStates,
    innerClass = '',
    isAbsolute,
}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const isLoadingLocal = APIStates?.some((state) => state === EAPICallState.LOADING)
        setIsLoading(isLoadingLocal || loading)
    }, [APIStates, loading])

    return (
        <div className={`relative ${wrapperClass} ${isLoading ? 'pointer-events-none' : ''}`}>
            {isLoading && (
                <div
                    className={`${
                        isAbsolute ? 'absolute -translate-y-1/2' : 'sticky'
                    } w-full h-full flex justify-center items-center`}
                >
                    <AiOutlineLoading
                        className={`${
                            isAbsolute ? '' : 'top-0'
                        } absolute text-blue-700 text-4xl animate-spin ${iconClass}`}
                    />
                </div>
            )}

            <div
                className={`loader-items duration-300 ${
                    isLoading ? 'invisible opacity-0' : 'visible opacity-100'
                } ${innerClass}`}
            >
                {children}
            </div>
        </div>
    )
}

export default Loader
