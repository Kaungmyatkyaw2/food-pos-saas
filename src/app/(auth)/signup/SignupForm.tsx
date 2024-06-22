"use client"

import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CustomFormField, CustomPasswordField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { createAccount } from '@/actions/auth'
import { RotateCcw } from "lucide-react"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    name: z.string().min(5).max(50),
    email: z.string().min(5).max(250).email(),
    password: z.string().min(6).max(25),
    confirmPassword: z.string().min(6).max(25),
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Passwords must match!",
        path: ["confirmPassword"],
    }
);

type FormValues = z.infer<typeof formSchema>


const SignupForm = () => {


    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            confirmPassword: "",
            password: ""
        }
    })
    const formControl = form.control

    async function onSubmit(values: FormValues) {
        setIsLoading(true)
        try {
            await createAccount({ email: values.email, password: values.password, name: values.name })
            toast.success("Successfully created an account!")
            router.push("/login")
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsLoading(false)
        }
    }


    return (

        <Form {...form}>
            <div className='space-y-6 md:w-[500px] w-full'>
                <div>
                    <h1 className='font-bold sm:text-3xl text-2xl'>Register Account Now👋</h1>
                    <p className='text-gray-600 text-sm pt-1'>Create new account to explore more!</p>
                </div>
                <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
                    <CustomFormField control={formControl} placeholder="John Doe" name="name" label="Name" />
                    <CustomFormField control={formControl} placeholder="johndoe@gmail.com" name="email" label="Email" />
                    <CustomPasswordField control={formControl} placeholder="*********" name="password" label="Password" />
                    <CustomPasswordField control={formControl} placeholder="*********" name="confirmPassword" label="Confirm Password" />
                    <Button aria-label='signup-btn' type='submit' className='w-full' disabled={isLoading}>
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

export default SignupForm