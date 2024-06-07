"use client"

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React, { useState } from 'react'

const DashboardCommonSidebar = ({ children,title }: { children: React.ReactNode,title : string }) => {

    const [open, setOpen] = useState(false)


    return (
        <div className="space-y-5">
            <Button onClick={() => setOpen(!open)} className="lg:hidden flex" variant={"secondary"} size={"icon"} >
                {open ? <X/> : <Menu />}
            </Button >
            <div className={`space-y-5 ${open ? "lg:block block" : "lg:block hidden"}`}>
                <h1 className="text-xl font-medium lg:ml-7">{title}</h1>
                {children}
            </div>
        </div>)
}

export default DashboardCommonSidebar