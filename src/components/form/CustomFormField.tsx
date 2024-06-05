
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
                                <Textarea placeholder={placeholder} {...field} />
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