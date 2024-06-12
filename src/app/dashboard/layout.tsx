import { Button } from '@/components/ui/button'
import { getSession } from '@/lib/auth'
import { Book, UserCircle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const SettingLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await getSession()

    if (!session?.user) {
        return redirect("/login")
    }

    return (
        <div className='w-full relative py-10'>
            <div className='full flex-wrap flex items-center gap-6 pb-4'>
                <Button aria-label='to-account-page' asChild variant={"outline"}>
                    <Link href="/dashboard/account">
                        <UserCircle className='h-5 w-5 mr-2' />
                        Account
                    </Link>
                </Button>
                <Button aria-label='to-resources-page' asChild variant={"outline"}>
                    <Link href="/dashboard/my-resources">
                        <Book className='h-5 w-5 mr-2' />
                        Resources
                    </Link>
                </Button>
            </div>
            <div className=''>
                {children}
            </div>
        </div>
    )
}

export default SettingLayout