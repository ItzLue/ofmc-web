import React from 'react'

type IProps = {
    children: React.ReactNode
}

const Infobox: React.FC<IProps> = ({children}) => {
    return <div className='flex flex-grow border bg-white drop-shadow-lg '
      {children}></div>
}

export default Infobox
