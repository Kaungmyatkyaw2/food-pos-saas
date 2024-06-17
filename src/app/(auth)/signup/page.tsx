import React from 'react'
import SignupForm from './SignupForm'
import { GoogleLoginButton } from '@/components/form/GoogleLoginButton'
import Link from 'next/link'

const SignupPage = () => {
    return (
        <>
            <SignupForm />
            <p className='text-gray-500 text-center text-sm py-[20px]'>(or)</p>
            <GoogleLoginButton className='w-full' />
            <p className='text-gray-500 text-center text-sm py-[20px]'>Already have an account? <Link href={"/login"} className='text-blue-600 underline'>Login here</Link></p>
        </>
    )
}

export default SignupPage