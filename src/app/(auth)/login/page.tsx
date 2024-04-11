import React from 'react'
import LoginForm from './LoginForm'
import { GoogleLoginButton } from '@/components/form/GoogleLoginButton'

const LoginPage = () => {
    return (
        <>
            <LoginForm />
            <p className='text-gray-600 text-center text-sm py-[20px]'>(or)</p>
            <GoogleLoginButton className='w-full' />
        </>
    )
}

export default LoginPage