"use client"

import Image from 'next/image'
import React from 'react'

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div className='space-y-9 py-10 flex flex-col items-center justify-center'>
            <Image className='mx-auto block' src={"/error.svg"} height={300} width={300} alt='graduation-pic' />
            <h1 className='font-bold text-3xl'>{error.message || "Something went wrong"}</h1>
        </div>
    )
}

export default ErrorPage