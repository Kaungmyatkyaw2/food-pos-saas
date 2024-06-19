"use client"

import { Resource, User } from '@/db/schema'
import React from 'react'
import { CustomAvatar, TimeAgo } from '../common'
import { BadgeContainer } from '../common/BadgeContainer'
import { useRouter } from 'next/navigation'



export const ResourceCard = ({ resource }: { resource: Resource & { author: User } }) => {

    const router = useRouter()

    return (
        <div key={resource.id} className='lg:w-[50%] w-full space-y-4 border-b p-5'>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <CustomAvatar img={resource.author?.image} name={resource.author?.name || ""} className='hover:ring' />
                    <h1 className='font-bold text-sm'> {resource.author?.name}</h1>
                </div>
                <TimeAgo className='text-neutral-600 text-xs' date={resource.createdAt!} />
            </div>

            <div
                onClick={e => {
                    e.stopPropagation()
                    router.push(`/resources/${resource.id}`)
                }}
            >
                <div className="flex space-x-2">
                    <div className='w-full flex flex-col justify-between overflow-hidden space-y-5'>
                        <div className='overflow-hidden line-clamp-4'>
                            <h1 className='font-bold w-full text-ellipsis overflow-x-hidden'>{resource.title}</h1>
                            <h1 className='text-xs text-neutral-600 w-full text-ellipsis'>{resource.description}</h1>
                        </div>
                        <BadgeContainer tags={resource.tags.split(",")} />
                    </div>
                    <div className='w-[200px] h-[120px]'>
                        <img className='border h-[120px] w-[200px] object-cover' src={resource.coverImage!} alt='coverImage' />
                    </div>
                </div>
            </div>
        </div>)
}
