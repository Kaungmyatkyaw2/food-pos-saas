"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from 'next-auth/react'

export const Navbar = () => {

    const { data: session } = useSession()

    return (
        <nav className='container sticky top-0 left-0 w-full h-[75px] flex items-center justify-between bg-white/30 backdrop-blur-sm border-b shadow-sm'>
            <h1 className='font-bold text-2xl'>ShareRes</h1>
            <div className='flex items-center space-x-3'>
                <Button aria-label='resource-link' variant={"link"} asChild>
                    <Link href={"/resources"}>Resources</Link>
                </Button>
                <Button aria-label='profile-btn' className='p-0 rounded-full'>
                    {
                        session?.user ?
                            <Avatar>
                                <AvatarImage src={session.user.image || ""} />
                                <AvatarFallback>{session.user.name?.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            :
                            <Button asChild><Link href={"/login"}>Login</Link></Button>
                    }
                </Button>
            </div>
        </nav>)
}
