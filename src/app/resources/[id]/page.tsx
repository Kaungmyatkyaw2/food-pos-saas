import { getResourceById } from '@/actions/resource'
import { CustomAvatar, TimeAgo } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ResourceDetailPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const resource = await getResourceById(id)

    if (!resource) return null

    const renderTextWithLineBreaks = (text: string) => {
        return { __html: text.replace(/\n/g, '<br />') };
    };

    return (
        <div className='container max-w-[900px] mx-auto py-10'>
            <Button variant={"outline"} size={"icon"} asChild>
                <Link href={"/resources"}>
                    <Home className='h-4 w-4' />
                </Link>
            </Button>
            <div className='w-full flex items-center justify-between flex-wrap gap-3 mt-8'>
                <div className='flex items-center space-x-2'>
                    <CustomAvatar img={resource.author?.image} name={resource.author?.name || ""} className='hover:ring w-14 h-14' />
                    <h1 className='font-bold text-sm'> {resource.author?.name}</h1>
                </div>
                <TimeAgo className='text-neutral-600 text-xs' date={resource.createdAt!} />
            </div>
            <div className='w-full border rounded-md overflow-hidden mt-6'>
                <img className='object-cover w-full max-h-[300px] h-fit' src={resource.coverImage} alt='coverImage' />
            </div>
            <div className='mt-6 text-sm' dangerouslySetInnerHTML={renderTextWithLineBreaks(resource.description)} />
            <div className='flex gap-2 mt-8'>
                {resource.tags.split(",").map((tag, index) => <Badge key={index} className='w-fit h-fit' variant={"secondary"}>{tag}</Badge>)}
            </div>
            <div>
                <Button className='w-full mt-8' variant={"default"} asChild>
                    <a href={resource.link} target='_blank'>
                        View Resource
                    </a>
                </Button>

            </div>
        </div>
    )
}

export default ResourceDetailPage