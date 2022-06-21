import React from 'react'
import { NextPage } from 'next'
import { signOut } from '@firebase/auth'
import { auth } from '@/helpers/firebase/firebase'
import Image from 'next/image'
import Infobox from '@/components/Infobox'
import { useAuthState } from 'react-firebase-hooks/auth'


type IProps = {
    totalCompleted: number
    userCreatedProtocols: number
    mostCompletedType: string
    onOpenLoginModal: () => void
    onOpenSignUpModal: () => void
}

const Hero: NextPage<IProps> = ({ totalCompleted, mostCompletedType, userCreatedProtocols, onOpenLoginModal, onOpenSignUpModal }) => {
    const [user, loading, error] = useAuthState(auth)


    const logout = () => {
        signOut(auth)
    }

    const userStats = (
        <div className='flex items-center gap-4 h-full w-full justify-between px-12'>
            <Infobox>
                <div className='flex flex-col text-center'>
                    <span>Protocols created</span>
                    <span className='font-bold text-lg'>{userCreatedProtocols}</span>
                </div>
            </Infobox>

            <Infobox>
                <div className='flex flex-col text-center'>
                    <span>Total attacks prevented</span>
                    <span className='font-bold text-lg'>{totalCompleted}</span>
                </div>
            </Infobox>

            <Infobox>
                <div className='flex flex-col text-center'>
                    <span>Most solved type</span>
                    <span className='font-bold text-lg'>{mostCompletedType}</span>
                </div>
            </Infobox>
        </div>
    )

    return (
        <div className='bg-gradient-to-r from-[#ADC9FB] h-1/3 relative'>
            <div className='flex flex-row-reverse'>
                {user && (
                    <div className='flex inline-flex gap-2 mt-4 mr-4'>
                        <p className='font-medium'>{user.displayName}</p>
                        {user.photoURL && (
                            <Image
                                className='rounded-full'
                                src={user.photoURL}
                                layout='fixed'
                                height={24}
                                width={24}
                            />
                        )}
                        <button onClick={logout} data-cy='log-out-button'>Log out</button>
                    </div>
                )}
            </div>
            {user ? (
                userStats
            ) : (
                <div className='flex justify-end mt-2 mr-2'>
                    <div className="flex gap-4">
                        <button onClick={onOpenLoginModal} data-cy='log-in-button'>Login</button>
                        <button className='px-4 border border-transparent bg-blue-500 rounded-full py-2 text-white' onClick={onOpenSignUpModal} data-cy='sign-up-button'>Sign up</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hero
