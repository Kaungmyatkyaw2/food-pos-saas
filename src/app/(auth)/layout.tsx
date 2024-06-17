import React, { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='container'>
            <section className='flex items-center justify-center'>
                <div className='md:w-[500px] w-full py-[40px]'>
                    {children}
                </div>
            </section>
        </div>
    )
}

export default AuthLayout