
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import React from 'react'
import { Control, FieldValues, Path } from "react-hook-form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import TextareaAutosize from 'react-textarea-autosize';
import { cn } from "@/lib/utils"


interface Props<T extends FieldValues> {
    control: Control<T>,
    description?: string,
    name: Path<T>,
    label: string,
    placeholder?: string,
    isTextArea?: boolean
}

export function CustomFormField<T extends FieldValues>({ control, description, name, label, placeholder, isTextArea }: Props<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {
                            isTextArea ?
                                <TextareaAutosize
                                maxRows={10}
                                    className={"flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
                                    placeholder={placeholder} {...field} />
                                :
                                <Input placeholder={placeholder} {...field} />

                        }
                    </FormControl>
                    {description &&
                        <FormDescription>
                            {description}
                        </FormDescription>
                    }
                    <FormMessage />
                </FormItem>
            )}
        />)
}