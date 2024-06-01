import { ProfileRootLayout } from "@/components/dashboard/profile";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return <ProfileRootLayout>{children}</ProfileRootLayout>;
};

export default ProfileLayout;
