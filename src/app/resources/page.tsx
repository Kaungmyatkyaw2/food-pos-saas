import { getResourcesForReader } from '@/actions/resource'
import { CustomAvatar, TimeAgo } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import React from 'react'

const ResourcesPage = async ({ searchParams: { page } }: { searchParams: { page: number } }) => {
    const resources = await getResourcesForReader(page) || []

    return (
        <div className='py-10'>
            {
                resources.map(re =>
                    <div key={re.id} className='max-w-[600px] w-full space-y-4 border-b p-5'>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                                <CustomAvatar img={re.author?.image} name={re.author?.name || ""} className='hover:ring' />
                                <h1 className='font-bold text-sm'> {re.author?.name}</h1>
                            </div>
                            <TimeAgo className='text-sm' date={re.createdAt!} />
                        </div>

                        <div className="flex space-x-2">
                            <div className='w-full flex flex-col justify-between overflow-hidden space-y-5'>
                                <div className='overflow-hidden line-clamp-4'>
                                    <h1 className='font-bold w-full text-ellipsis overflow-x-hidden'>{re.title}</h1>
                                    <h1 className='text-xs text-neutral-600 w-full text-ellipsis'>{re.description}</h1>
                                </div>
                                <div className='flex gap-2'>
                                    {re.tags.split(",").map((tag, index) => <Badge key={index} className='w-fit h-fit' variant={"secondary"}>{tag}</Badge>)}
                                </div>
                            </div>
                            <div className='w-[200px] h-[120px]'>
                                <img className='border h-[120px] w-[200px] object-cover' src={re.coverImage!} alt='coverImage' />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ResourcesPage