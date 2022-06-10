import React from 'react'
import { NextPage } from 'next'
import {
    browserSessionPersistence,
    GithubAuthProvider,
    setPersistence,
    signInWithPopup,
} from '@firebase/auth'
import { useRecoilState } from 'recoil'
import { auth, provider } from '../helpers/firebase/firebase'
import { userState } from '../recoil/atoms/users'
import writeNewUser from '../helpers/firebase/create-new-user'
import Image from 'next/image'
import Infobox from '@/components/Infobox'

const Hero: NextPage = () => {
    const [user, setUser] = useRecoilState(userState)

    const onSignIn = async () => {
        await setPersistence(auth, browserSessionPersistence)
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user
                writeNewUser(user)
                setUser(user)
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                const email = error.customData.email
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error)
            })
    }

    const userStats = (
        <div className="flex items-center gap-4 h-full w-full justify-between px-12">
            <Infobox>
                <div>{user?.displayName}</div>
            </Infobox>

            <Infobox>
                <div>{user?.displayName}</div>
            </Infobox>

            <Infobox>
                <div>{user?.displayName}</div>
            </Infobox>
        </div>
    )

    return (
        <div className="bg-gradient-to-r from-[#ADC9FB] h-1/3">
            <div className="flex flex-row-reverse">
                {user && (
                    <div className="flex inline-flex gap-2 mt-4 mr-4">
                        <p className="font-medium">{user.displayName}</p>
                        {user.photoURL && (
                            <Image
                                className="rounded-full"
                                src={user.photoURL}
                                layout="fixed"
                                height={24}
                                width={24}
                            />
                        )}
                    </div>
                )}
            </div>
            {user ? (
                userStats
            ) : (
                <div className="text-center h-full w-full">
                    <button onClick={onSignIn}>Please login to see stats</button>
                </div>
            )}
        </div>
    )
}

export default Hero
