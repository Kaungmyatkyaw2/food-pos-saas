"use client"

import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CustomFormField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { RotateCcw } from "lucide-react"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { FileUploader } from "react-drag-drop-files";
import { Label } from '@/components/ui/label'



const formSchema = z.object({
    tags: z.string().min(5).max(250),
    title: z.string().min(5).max(250),
    description: z.string().min(5).max(250),
})

type FormValues = z.infer<typeof formSchema>


const CreateResourceForm = () => {


    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tags: "",
            description: "",
            title: ""
        }
    })
    const formControl = form.control

    async function onSubmit(values: FormValues) {
        setIsLoading(true)
        try {
            // await createAccount({ email: values.email, password: values.password, name: values.name })
            toast.success("Successfully created an account!")
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }


    return (

        <Form {...form}>
            <div className='space-y-6 w-full'>
                <div>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Share a resource</h1>
                    <p className='text-gray-600 text-sm pt-1'>Create new resource for everyone!</p>
                </div>
                <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
                    <div className='space-y-2'>
                        <Label>Cover Image</Label>
                        <FileUploader handleChange={() => { }} name="file" types={["JPG"]} />
                    </div>

                    <CustomFormField control={formControl} placeholder="Title" name="title" label="Title" />
                    <CustomFormField control={formControl} placeholder="Description" name="description" label="Description" isTextArea />
                    <CustomFormField control={formControl} placeholder="Tags" name="tags" label="Tags" isTextArea />

                    <div className='w-full pt-5'>
                        <Button aria-label='shaee-resource-btn' type='submit' className='w-full py-6' disabled={isLoading}>
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

export default CreateResourceForm