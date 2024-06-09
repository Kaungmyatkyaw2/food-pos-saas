import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className='border-t py-[20px] lg:px-28 px-5 flex justify-between items-center md:!flex-row !flex-col md:space-y-0 space-y-[15px]'>
            <Link href={"/"} className='flex items-center flex-1 space-x-2'>
                <Image alt='icon' src={'/icon.png'} width={50} height={50} className='rounded-lg' />
                <span className='font-bold text-lg'>Shares</span>
            </Link>
            <p className='text-sm text-gray-500 flex-2 text-center'>&copy; {new Date().getFullYear()} Share res. All rights reserved.</p>
            <p className='text-sm flex-1 sm:text-end text-center'>This app is createdy by <a className='underline' href="https://github.com/Kaungmyatkyaw2">Kaung Myat Kyaw</a></p>
        </div>
    )
}