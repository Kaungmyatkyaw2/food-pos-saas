import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
    const session = await getSession()

    if (session?.user) {
        return redirect("/")
    }


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