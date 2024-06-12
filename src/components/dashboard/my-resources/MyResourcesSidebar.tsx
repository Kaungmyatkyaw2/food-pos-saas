"use client"

import { SidebarNavigateButton } from "@/components/common";
import { Book, Plus } from "lucide-react";
import DashboardCommonSidebar from "../DashboardCommonSidebar";

const MyResourcesSidebar = () => {



    return (
        <DashboardCommonSidebar title="My Resources">
            <div className="space-y-1">
                <SidebarNavigateButton
                    title="My Resources"
                    icon={Book}
                    description="Your resources"
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
        </DashboardCommonSidebar>
    )
}

export default MyResourcesSidebar