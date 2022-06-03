import { NextPage } from 'next'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FiSettings } from 'react-icons/fi'
import { useRouter } from 'next/router'

const TopNav: NextPage = () => {

    const router = useRouter();
    return (
        <nav className='flex items-center justify-between w-full h-fit px-6 text-white'>
            <button type='button' className='bg-gray-800 px-2 p-1 rounded-bl-lg rounded-br-lg hover:bg-blue-800' onClick={() => router.back()}>
                <GiHamburgerMenu className='h-8 w-8' />
            </button>
            <button type='button' className='bg-gray-800 px-2 p-1 rounded-bl-lg rounded-br-lg hover:bg-blue-800'>
                <FiSettings className='h-8 w-8' />
            </button>
        </nav>
    )
}

export default TopNav
