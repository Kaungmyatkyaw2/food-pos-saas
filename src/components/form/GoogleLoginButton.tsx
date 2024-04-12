"use client"

import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { cn } from '@/lib/utils'

export const GoogleLoginButton = (props: ButtonProps) => {
    return (
        <Button aria-label='google-login-btn' onClick={() => { signIn("google", { callbackUrl: "/" }) }} className={cn("py-6", props)} variant={"secondary"} {...props}>
            <Image alt='google-icon' src={"/google.svg"} width={25} height={25} />
            <span className='ml-2'>Login with Google</span>
        </Button>
    )
}
