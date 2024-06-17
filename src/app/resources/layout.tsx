import React from 'react'

const ResourceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='sm:container'>
            {children}
        </div>
    )
}

export default ResourceLayout