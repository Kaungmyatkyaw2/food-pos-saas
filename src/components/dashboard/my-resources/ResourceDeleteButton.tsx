import { Button } from '@/components/ui/button'
import { LoaderIcon, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import { Resource } from '@/db/schema'
import { toast } from 'sonner'
import { deleteResource } from '@/actions/resource'

function DeleteModel({ resource, ...props }: AlertDialogProps & { resource: Resource }) {

    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)


        try {
            await deleteResource(resource.id)
            props?.onOpenChange?.(false)
            toast.success("Succesfully deleted the resource!")
        } catch (error) {
            toast.error((error as Error)?.message || "Something went wrong")
        } finally {
            setIsLoading(false)

        }
    }

    return (
        <AlertDialog {...props} onOpenChange={isLoading ? undefined : props.onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <Button disabled={isLoading} onClick={handleDelete}>
                        {
                            isLoading && <LoaderIcon className='w-4 h-4 mr-2 animate-spin' />
                        }
                        Continue
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >
    )
}

const ResourceDeleteButton = ({ resource }: { resource: Resource }) => {

    const [openModel, setOpenModel] = useState(false)

    return (
        <>
            <Button onClick={() => { setOpenModel(true) }} className='rounded-full border bg-neutral-200' size={"icon"} variant={"secondary"}>
                <Trash className='w-3 h-3' />
            </Button>
            <DeleteModel resource={resource} open={openModel} onOpenChange={setOpenModel} />
        </>
    )
}

export default ResourceDeleteButton