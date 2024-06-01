"use client";

import { CustomAvatar } from "@/components/common";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail } from "lucide-react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();
  const profile = session?.user

  return (
    <div className="w-full space-y-7">

      <CustomAvatar className="w-20 h-20" img={profile?.image} name={profile?.name || ""} />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-xl font-bold">{profile?.name}</h1>
        <p className="flex items-center  text-slate-400 sm:text-base text-xs">
          <Mail className="min-w-4 min-h-4 w-4 h-4 mr-2" />
          {profile?.email}
        </p>
      </div>
    </div>
  );
};

export default Profile;
