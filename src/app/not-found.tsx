import Image from 'next/image'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='space-y-9 py-10 flex flex-col items-center justify-center'>
            <Image className='mx-auto block' src={"/404.svg"} height={300} width={300} alt='graduation-pic' />
            <h1 className='font-bold text-3xl'>Page is not found</h1>
        </div>
    )
}

export default NotFoundPage