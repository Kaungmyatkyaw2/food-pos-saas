"use client"

import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CustomFileInput, CustomFormField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { RotateCcw } from "lucide-react"
import { toast } from 'sonner'
import { createResource } from '@/actions/resource'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    tags: z.string().min(3),
    title: z.string().min(5).max(100),
    description: z.string().min(5),
    link: z.string().url(),
}).refine((val) => {
    const pattern = /^#\w+(?:,#\w+)*$/;
    return pattern.test(val.tags);

}, {
    message: "Invalid Tag Format!",
    path: ["tags"],

})

type FormValues = z.infer<typeof formSchema>


export const convertFileToBuffer = async (inputFile: File) => {
    const arrayBuffer = await inputFile?.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
};

const CreateResourceForm = () => {


    const [isLoading, setIsLoading] = useState(false)
    const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
    const router = useRouter()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tags: "",
            description: "",
            title: "",
            link: ''
        }
    })
    const formControl = form.control

    async function onSubmit(values: FormValues) {

        if (!coverImageFile) {
            toast.error("Cover image is requied!")
            return;
        }

        const maxSize = 0.5 * 1024 * 1024;

        if (coverImageFile.size > maxSize) {
            toast.error("File size exceeds 0.5MB");
            return;
        }

        setIsLoading(true)


        try {

            const coverImageBuffer = await convertFileToBuffer(coverImageFile)

            await createResource({
                description: values?.description,
                title: values?.title,
                tags: values?.tags,
                link: values?.link,
                coverImageBuffer
            })


            toast.success("Successfully created an resource!")
            form.reset()
            setCoverImageFile(null)
            router.push("/dashboard/my-resources")
        } catch (error) {
            toast.error((error as Error)?.message || "Something went wrong")
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
                    <CustomFileInput label='Cover Image' file={coverImageFile} setFile={setCoverImageFile} accept='image/*' />

                    <CustomFormField control={formControl} placeholder="Title" name="title" label="Title" />
                    <CustomFormField control={formControl} placeholder="Link" name="link" label="Link" />
                    <CustomFormField control={formControl} placeholder="Description" name="description" label="Description" isTextArea />
                    <CustomFormField control={formControl} placeholder="Eg: #js,#notion" name="tags" label="Tags" isTextArea />

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