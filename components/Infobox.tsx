import React from 'react'

type IProps = {
    children: React.ReactNode
}

const Infobox: React.FC<IProps> = ({ children }) => {
    return (
        <div className="flex flex-grow border bg-white drop-shadow-lg min-h-min rounded-lg max-w-max p-4">
            {children}
        </div>
    )
}

export default Infobox
