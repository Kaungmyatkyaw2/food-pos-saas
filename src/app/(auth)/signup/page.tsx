import React from 'react'
import SignupForm from './SignupForm'
import { GoogleLoginButton } from '@/components/form/GoogleLoginButton'

const SignupPage = () => {
    return (
        <>
            <SignupForm />
            <p className='text-gray-600 text-center text-sm py-[20px]'>(or)</p>
            <GoogleLoginButton className='w-full' />
        </>
    )
}

export default SignupPage