"use client"

import { SidebarNavigateButton } from "@/components/common";
import { Bookmark, Plus } from "lucide-react";
import React from 'react'

const MyResourcesSidebar = () => {
    return (
        <div className="space-y-5">
            <h1 className="text-xl font-medium lg:ml-7">My Resources</h1>
            <div className="space-y-1">

                <SidebarNavigateButton
                    title="My Resources"
                    icon={Bookmark}
                    description="Your all created resources"
                    endWith="/dashboard/my-resources"
                    href="/dashboard/my-resources"
                />
                <SidebarNavigateButton
                    title="Create Resource"
                    icon={Plus}
                    description="Share your resources"
                    endWith="my-resources/create"
                    href="/dashboard/my-resources/create"
                />
            </div>
        </div>)
}

export default MyResourcesSidebar