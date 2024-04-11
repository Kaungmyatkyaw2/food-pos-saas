import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='container h-screen flex items-center justify-center'>
            <div className='md:w-[500px] w-full'>
                {children}
            </div>
        </section>
    )
}

export default AuthLayout