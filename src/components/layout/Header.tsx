"use client"

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Badge } from '../ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CustomAvatar } from '../common'


const AccountDropDown = () => {

    const { data: session } = useSession()
    const router = useRouter()

    const handleSignOut = () => {
        signOut({
            callbackUrl: "/"
        })
    }

    const toDashboard = () => {
        router.push("/dashboard")
    }




    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <CustomAvatar img={session?.user.image} name={session?.user.name || ""} className='hover:ring' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut} className='cursor-pointer'>
                    <LogOut className='mr-3' size={18} />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toDashboard} className='cursor-pointer'>
                    <Settings className='mr-3' size={18} />
                    Dashboard
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



export const Header = () => {

    const { data: session } = useSession()

    return (
        <nav className='container sticky top-0 left-0 w-full h-[75px] flex items-center justify-between bg-white/30 backdrop-blur-sm border-b shadow-sm z-10'>
            <div className='flex flex-wrap items-center space-x-2 max-w-full'>
                <Link href={"/"} className='font-bold sm:text-2xl text-xl'>ShareRes</Link>

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
