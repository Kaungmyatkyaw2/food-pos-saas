import React from "react";
import MyResourcesSidebar from "./MyResourcesSidebar";
import DashboardCommonRootLayout from "../DashboardCommonRootLayout";

const MyResourcesRootLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <DashboardCommonRootLayout sideBar={<MyResourcesSidebar />}>
            {children}
        </DashboardCommonRootLayout>
    );
};

export { MyResourcesRootLayout };
