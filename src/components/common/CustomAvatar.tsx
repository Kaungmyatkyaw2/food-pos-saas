"use client"

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import AvatarGenerator, { genConfig } from 'react-nice-avatar'
import { CircleUser } from 'lucide-react'
export const CustomAvatar = ({ name, img, className }: { name: string, img?: string | null, className?: string }) => {


    const config = genConfig(name)


    if (!name) {
        return <CircleUser className={cn(className, "text-neutral-400")} />
    }

    return (
        img ?
            <Avatar className={className}>
                <AvatarImage alt='profile picture' src={img as string} />
                <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            :
            <AvatarGenerator className={cn("w-10 h-10", className)} {...config} />

    )
}
