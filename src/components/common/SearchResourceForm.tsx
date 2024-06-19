"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SearchResourceForm = () => {

    const router = useRouter()
    const [search, setSearch] = useState("")
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (!search) {
                    return
                }
                router.push(`/resources?search=${search}`)
            }}
            className='flex items-center border rounded-full p-2 space-x-2 md:w-[500px] w-[90%] mx-auto'
        >
            <Input onChange={e => setSearch(e.target.value)} placeholder='Search course or resources by keyword....' className='border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 flex-grow-1' />
            <Button type='submit' className='rounded-full sm:w-[20%] w-fit'>Search</Button>
        </form>)
}

export { SearchResourceForm }