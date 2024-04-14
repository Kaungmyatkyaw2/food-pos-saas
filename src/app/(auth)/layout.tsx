import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='min-h-screen flex items-center justify-center'>
            <div className='md:w-[500px] w-full py-[40px]'>
                {children}
            </div>
        </section>
    )
}

export default AuthLayout