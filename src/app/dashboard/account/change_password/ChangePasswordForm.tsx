"use client"

import { Form } from '@/components/ui/form'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CustomFormField, CustomPasswordField } from '@/components/form'
import { Button } from '@/components/ui/button'
import { RotateCcw } from "lucide-react"
import { toast } from 'sonner'
import { updatePassword } from '@/actions/auth'


const formSchema = z.object({
    oldPassword: z.string().min(6).max(25),
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


const ChangePasswordForm = () => {


    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            confirmPassword: "",
            password: "",
            oldPassword: "",
        }
    })
    const formControl = form.control

    async function onSubmit({ oldPassword, password }: FormValues) {
        setIsLoading(true)
        try {
            await updatePassword({ oldPassword, password })
            form.reset()
            toast.success("Successfully updated your password!")
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
                    <h1 className='font-bold sm:text-3xl text-2xl'>Change your password🛡️</h1>
                </div>
                <form autoComplete='off' onSubmit={form.handleSubmit(onSubmit)} className='space-y-5 '>
                    <CustomPasswordField control={formControl} placeholder="*********" name="oldPassword" label="Old Password" />
                    <CustomPasswordField control={formControl} placeholder="*********" name="password" label="New Password" />
                    <CustomPasswordField control={formControl} placeholder="*********" name="confirmPassword" label="Confirm Password" />

                    <div className='flex space-x-6'>
                        <Button
                            onClick={() => {
                                form.reset({ password: "", oldPassword: "", confirmPassword: "" })
                            }}
                            variant={"ghost"} aria-label='reset-button' type='button' disabled={isLoading}>
                            Reset
                        </Button>
                        <Button aria-label='signup-btn' type='submit' disabled={isLoading}>
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

export default ChangePasswordForm