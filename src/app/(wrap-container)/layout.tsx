import React from 'react'

const ContainerWrapperLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container">
            {children}
        </div>)
}

export default ContainerWrapperLayout