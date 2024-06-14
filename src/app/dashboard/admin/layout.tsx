import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/auth'
import { Book, Lock, User, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const SettingLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getSession()

    if (!session?.user) {
        return redirect("/login")
    }

    if (!session.user.isAdmin) {
        return redirect("/dashboard")
    }

    return (
        children
    )
}

export default SettingLayout