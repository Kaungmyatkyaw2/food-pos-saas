"use client"

import { Navbar } from '@/components/layout'
import { AvatarFallback, AvatarImage, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {

  const { data } = useSession()


  return (
    <main>

      <Navbar />

      <section id='main-lading' className='container h-[calc(100vh-75px)] flex justify-center items-center'>
        <div className='md:w-[80%] w-full h-fit'>
          <h1 className='font-bold md:text-5xl text-3xl text-center'>Share learning resources & help each other</h1>
          <p className='text-sm text-gray-500 text-center px-6 pt-4 pb-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque veritatis voluptatem, porro obcaecati voluptates fugiat distinctio dignissimos exercitationem totam, architecto earum vitae, atque voluptatum? Repellendus dolor soluta dolorum amet animi?</p>
          <div className='flex items-center border rounded-full p-2 space-x-2 md:w-[500px] w-[90%] mx-auto'>
            <Input placeholder='Search course or resources by keyword....' className='border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 flex-grow-1' />
            <Button className='rounded-full sm:w-[20%] w-fit'>Search</Button>
          </div>
          <Image className='mt-[20px] mx-auto block' src={"/sidepic.svg"} height={500} width={500} alt='graduation-pic'/>
        </div>
      </section>

    </main>
  )
}

export default Home