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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    email: z.string().min(5).max(250).email(),
    password: z.string().min(6).max(25),
})

type FormValues = z.infer<typeof formSchema>


const LoginForm = () => {


    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const formControl = form.control
    const router = useRouter()

    async function onSubmit({ email, password }: FormValues) {
        setIsLoading(true)
        try {
            const res = await signIn("credentials", { email, password, redirect: false })


            if (res?.status !== 200) {
                toast.error(res?.error)
            } else {
                router.push("/")
                toast.success("Successfully created an account!")
            }

        } catch (error) {
            console.log(error)
            toast.error((error as Error).name)
        } finally {
            setIsLoading(false)
        }
    }


    return (

        <Form {...form}>
            <div className='space-y-6 w-full'>
                <div>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Welcome back!👋</h1>
                    <p className='text-gray-600 text-sm pt-1'>Logn in to your acc to explore more!</p>
                </div>
                <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
                    <CustomFormField control={formControl} placeholder="johndoe@gmail.com" name="email" label="Email" />
                    <CustomFormField control={formControl} placeholder="*********" name="password" label="Password" />
                    <Button type='submit' disabled={isLoading}>
                        {isLoading &&
                            <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                        }
                        Submit
                    </Button>
                </form>
            </div>
        </Form>
    )
}

export default LoginForm