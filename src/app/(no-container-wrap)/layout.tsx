import React from 'react'

const NoContainerWrapperLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="sm:container">
            {children}
        </div>)
}

export default NoContainerWrapperLayout