import React from "react";
import ProfileSidebar from "./ProfileSidebar";
import DashboardCommonRootLayout from "../DashboardCommonRootLayout";

const ProfileRootLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardCommonRootLayout sideBar={<ProfileSidebar />}>
            {children}
        </DashboardCommonRootLayout>
    );
};

export { ProfileRootLayout };
