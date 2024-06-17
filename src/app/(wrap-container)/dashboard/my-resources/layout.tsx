import { MyResourcesRootLayout } from "@/components/dashboard/my-resources";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return <MyResourcesRootLayout>{children}</MyResourcesRootLayout>;
};

export default ProfileLayout;
