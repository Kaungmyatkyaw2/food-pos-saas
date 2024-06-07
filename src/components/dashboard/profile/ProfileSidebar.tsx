"use client"


import { SidebarNavigateButton } from "@/components/common";
import { FilePenLine, LockOpen, Menu, UserRound } from "lucide-react";
import DashboardCommonSidebar from "../DashboardCommonSidebar";

const ProfileSidebar = () => {


    return (
        <DashboardCommonSidebar title="Account Setting">
            <div className="space-y-1">
                <SidebarNavigateButton
                    title="My Profile"
                    icon={UserRound}
                    description="Your profile"
                    endWith="/dashboard/account"
                    href="/dashboard/account"
                />
                <SidebarNavigateButton
                    title="Edit Profile"
                    icon={FilePenLine}
                    description="Edit your profile"
                    endWith="/dashboard/account/edit"
                    href="/dashboard/account/edit"
                />
                <SidebarNavigateButton
                    title="Change password"
                    icon={LockOpen}
                    description="Change your password"
                    endWith="/dashboard/account/change_password"
                    href="/dashboard/account/change_password"
                />

            </div>
        </DashboardCommonSidebar>)
}

export default ProfileSidebar