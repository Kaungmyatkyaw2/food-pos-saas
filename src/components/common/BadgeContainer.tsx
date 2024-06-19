"use client"
import React from 'react'
import { badgeVariants } from '../ui/badge'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export const BadgeContainer = ({ tags }: { tags: string[] }) => {
    const router = useRouter()

    return (
        <div onClick={e => { e.stopPropagation() }} className='flex flex-wrap gap-2'>
            {tags.map((tag, index) =>
                <button
                    key={index}
                    className={cn(badgeVariants({ variant: "secondary" }), "w-fit h-fit")}
                    onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/resources?search=${tag.substring(1, tag.length)}`)
                    }}
                >
                    {tag}
                </button>
            )}
        </div>
    )
}
