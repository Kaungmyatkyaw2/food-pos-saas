"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession,signOut } from 'next-auth/react'
import { Badge } from '../ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut } from 'lucide-react'


const AccountDropDown = () => {

    const { data: session } = useSession()

    const handleSignOut = () => {
        signOut({
            callbackUrl: "/"
        })
    }



    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="hover:ring">
                        <AvatarImage alt='profile picture' src={session?.user.image as string} />
                        <AvatarFallback>{session?.user.name}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
                        <LogOut className='mr-3' size={18} />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}



export const Header = () => {

    const { data: session } = useSession()

    return (
        <nav className='container sticky top-0 left-0 w-full h-[75px] flex items-center justify-between bg-white/30 backdrop-blur-sm border-b shadow-sm'>
            <div className='flex items-center space-x-2'>
                <Link href={"/"} className='font-bold text-2xl'>ShareRes</Link>

                <Badge className="sm:flex hidden" variant={"outline"}>Share now</Badge>
            </div>
            <div className='flex items-center space-x-3'>
                <Button aria-label='resource-link' variant={"link"} asChild>
                    <Link href={"/resources"}>Resources</Link>
                </Button>
                <Button aria-label='profile-btn' className='p-0 rounded-full'>
                    {
                        session?.user ?
                            <AccountDropDown />
                            :
                            <Button asChild><Link href={"/login"}>Login</Link></Button>
                    }
                </Button>
            </div>
        </nav>)
}
