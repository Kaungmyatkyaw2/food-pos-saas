"use client";

import { FilePenLine, LockOpen, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileRootLayout = ({ children }: { children: React.ReactNode }) => {
    const path = usePathname();

    return (
        <div className="text-neutral-900 min-h-screen bg-white py-16 lg:px-16 px-5 rounded-lg shadow flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 overflow-auto">
            <div className="space-y-5">
                <h1 className="text-xl font-medium lg:ml-7">Account Settings</h1>
                <div className="space-y-1">
                    <Link
                        href={"/dashboard/account"}
                        className={`flex space-x-2 hover:bg-neutral-100 w-full lg:px-7 px-3 py-3 rounded-md ${path.endsWith("/account") ? "bg-neutral-100" : "bg-transparent"
                            }`}
                    >
                        <UserRound className="w-5 h-5 mr-2" />
                        <div>
                            <p className="text-[14px] font-medium">My Profile</p>
                            <p className="text-[14px] text-neutral-400">
                                Only mentions and comments
                            </p>
                        </div>
                    </Link>
                    <Link
                        href={"/dashboard/account/edit"}
                        className={`flex space-x-2 hover:bg-neutral-100 w-full lg:px-7 px-3 py-3 rounded-md ${path.endsWith("/account/edit")
                            ? "bg-neutral-100"
                            : "bg-transparent"
                            }`}
                    >
                        <FilePenLine className="w-5 h-5 mr-2" />
                        <div>
                            <p className="text-[14px] font-medium">Edit Profile</p>
                            <p className="text-[14px] text-neutral-400">
                                Email digest mentions & all activity
                            </p>
                        </div>
                    </Link>
                    <Link
                        href={"/dashboard/account/change_password"}
                        className={`flex space-x-2 hover:bg-neutral-100 w-full lg:px-7 px-3 py-3 rounded-md ${path.endsWith("/account/change_password")
                            ? "bg-neutral-100"
                            : "bg-transparent"
                            }`}
                    >
                        <LockOpen className="w-5 h-5 mr-2" />
                        <div>
                            <p className="text-[14px] font-medium">Change Password</p>
                            <p className="text-[14px] text-neutral-400">
                                Secure your password
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex-1 lg:px-14">{children}</div>
        </div>
    );
};

export { ProfileRootLayout };
