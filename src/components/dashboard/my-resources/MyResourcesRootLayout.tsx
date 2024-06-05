import React from "react";
import MyResourcesSidebar from "./MyResourcesSidebar";

const MyResourcesRootLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="text-neutral-900 min-h-screen bg-white py-16 lg:px-16 px-5 rounded-lg shadow flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 overflow-auto">
            <MyResourcesSidebar />
            <div className="flex-1 lg:px-14">{children}</div>
        </div>
    );
};

export { MyResourcesRootLayout };
