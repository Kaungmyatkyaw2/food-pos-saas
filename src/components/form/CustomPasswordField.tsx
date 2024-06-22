
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import React, { useState } from 'react'
import { Control, FieldValues, Path } from "react-hook-form"
import { Input } from "../ui/input"
import { Eye, EyeOff } from "lucide-react"


interface Props<T extends FieldValues> {
    control: Control<T>,
    description?: string,
    name: Path<T>,
    label: string,
    placeholder?: string,
    isTextArea?: boolean
}

export function CustomPasswordField<T extends FieldValues>({ control, description, name, label, placeholder }: Props<T>) {

    const [isPassword, setIsPassword] = useState(true)

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl className="relative">
                        <div className="relative">
                            <Input placeholder={placeholder} {...field} type={isPassword ? "password" : "text"} />
                            <button
                                type="button"
                                className="absolute right-2 top-[50%] translate-y-[-50%] text-neutral-600"
                                onClick={() => { setIsPassword(prev => !prev) }}
                            >
                                {isPassword ? <EyeOff className="size-6" /> : <Eye className="size-6" />}
                            </button>
                        </div>
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