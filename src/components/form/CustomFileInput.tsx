import { Label } from '@radix-ui/react-label'
import { Image } from 'lucide-react'
import React, { useRef } from 'react'

interface Props {
    label?: string,
    file: File | null,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const CustomFileInput = ({ label, file, setFile }: Props) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className='space-y-2'>
            <Label>{label}</Label>
            <div onClick={() => { fileInputRef?.current?.click() }} className='cursor-pointer hover:text-blue-500 hover:border-blue-500 text-neutral-500 border-2 border-dashed rounded-lg p-5 flex items-center gap-x-4'>
                <Image />
                <p>{file ?
                    "Succesfully uploaded file!"
                    :
                    "Upload cover image from your computer"
                }</p>
                <input onChange={e => { e.target.files && setFile(e?.target?.files[0]) }} ref={fileInputRef} type='file' accept='image' className='hidden' />
            </div>

        </div>)
}
