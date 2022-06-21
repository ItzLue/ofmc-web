import { NextPage } from 'next'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/helpers/firebase/firebase'

const TopNav: NextPage = () => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    return (
        <nav className="flex items-center justify-between w-full h-fit px-6 text-white">
            <button
                cy-data='back-button'
                type="button"
                className="bg-gray-800 px-2 p-1 rounded-bl-lg rounded-br-lg hover:bg-blue-800"
                onClick={() => router.back()}
            >
                <GiHamburgerMenu className="h-8 w-8" />
            </button>
            <div className="flex inline-flex gap-2 mt-4 mr-4">
                <p className="font-medium">{user?.displayName}</p>
                {user?.photoURL && (
                    <Image
                        className="rounded-full"
                        src={user.photoURL}
                        layout="fixed"
                        alt="user-photo"
                        height={24}
                        width={24}
                    />
                )}
            </div>
        </nav>
    )
}

export default TopNav
