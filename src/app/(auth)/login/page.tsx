import React from 'react'
import LoginForm from './LoginForm'
import { GoogleLoginButton } from '@/components/form/GoogleLoginButton'
import Link  from 'next/link'

const LoginPage = () => {
    return (
        <>
            <LoginForm />
            <p className='text-gray-500 text-center text-sm py-[20px]'>(or)</p>
            <GoogleLoginButton className='w-full' />
            <p className='text-gray-500 text-center text-sm py-[20px]'>Doesn't have an account? <Link href={"/signup"} className='text-blue-600 underline'>Register here</Link></p>
        </>
    )
}

export default LoginPage