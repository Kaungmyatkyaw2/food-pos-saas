"use client"

import { Form } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CustomFormField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { RotateCcw } from "lucide-react"
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { updateProfile } from '@/actions/auth'
import { CustomAvatar } from '@/components/common'


const formSchema = z.object({
    name: z.string().min(5).max(250),
})

type FormValues = z.infer<typeof formSchema>


const EditProfileForm = () => {


    const [isLoading, setIsLoading] = useState(false)
    const { data: session, update } = useSession()
    const profile = session?.user


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: profile?.name || "",
        }
    })
    const formControl = form.control

    useEffect(() => {
        form.reset({ name: profile?.name || "" })
    }, [profile])

    async function onSubmit({ name }: FormValues) {
        setIsLoading(true)
        try {
            const response = await updateProfile({ name })
            update({ ...session, user: response })
            toast.success("Successfully updated profile!")
        } catch (error) {
            toast.error((error as Error).message || "An error occured.")
        } finally {
            setIsLoading(false)
        }
    }


    return (

        <Form {...form}>
            <div className='space-y-7 w-full'>
                <div>
                    <CustomAvatar className="w-20 h-20" img={profile?.image} name={profile?.name || ""} />
                </div>
                <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
                    <CustomFormField control={formControl} placeholder="John Doe" name="name" label="Name" />
                    <div className='space-x-6 flex'>
                        <Button onClick={() => {
                            form.reset({ name: profile?.name || "" })
                        }} variant={"ghost"} aria-label='reset-button' type='button' disabled={isLoading}>
                            Reset
                        </Button>
                        <Button aria-label='update-profile-button' type='submit' disabled={isLoading}>
                            {isLoading &&
                                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Form>
    )
}

export default EditProfileForm