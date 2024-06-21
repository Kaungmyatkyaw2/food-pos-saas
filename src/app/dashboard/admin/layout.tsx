import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const SettingLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getSession()

    if (!session?.user) {
        return redirect("/login")
    }

    if (!session.user.isAdmin) {
        return redirect("/dashboard/account")
    }

    return (
        children
    )
}

export default SettingLayout