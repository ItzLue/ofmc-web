import { NextPage } from 'next'
import { GiHamburgerMenu } from 'react-icons/gi'

const TopNav: NextPage = () => {
    return (
        <nav className="flex items-center justify-between w-full h-fit px-12">
            <button type="button" className="bg-blue-400">
                <GiHamburgerMenu className="h-4 w-4" />
            </button>
        </nav>
    )
}

export default TopNav
