
"use client"

import React from 'react'
import Image from 'next/image'
import { SearchResourceForm } from '../common'

export const HomeSection = () => {


    return (
        <section id='home' className='h-[calc(100vh-75px)] flex justify-center items-center'>
            <div className='md:w-[80%] w-full h-fit'>
                <h1 className='font-bold md:text-5xl text-3xl text-center'>Share learning resources & help each other</h1>
                <p className='text-sm text-gray-500 text-center md:px-6 pt-4 pb-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veritatis voluptatem, porro obcaecati voluptates fugiat distinctio dignissimos exercitationem totam, architecto earum vitae, atque voluptatum? Repellendus dolor soluta dolorum amet animi?</p>
                <SearchResourceForm />
                <Image className='mt-[20px] mx-auto block' src={"/sidepic.svg"} height={500} width={500} alt='graduation-pic' />
            </div>
        </section>)
}
