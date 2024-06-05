"use client"

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
    icon: LucideIcon
    title: string,
    description: string,
    href: string,
    endWith: string,
}

export const SidebarNavigateButton = (props: Props) => {

    const path = usePathname()

    return (
        <Link
            href={props.href}
            className={`flex space-x-2 hover:bg-neutral-100 w-full lg:px-7 px-3 py-3 rounded-md ${path.endsWith(props.endWith) ? "bg-neutral-100" : "bg-transparent"}`}
        >
            <props.icon className="w-5 h-5 mr-2" />
            <div>
                <p className="text-[14px] font-medium">{props.title}</p>
                <p className="text-[14px] text-neutral-400">
                    {props.description}
                </p>
            </div>
        </Link>)
}
