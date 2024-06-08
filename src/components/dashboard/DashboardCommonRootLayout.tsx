import React from 'react'

const DashboardCommonRootLayout = (props: { sideBar: React.ReactNode, children: React.ReactNode }) => {
    return (
        <div className="text-neutral-900 lg:min-h-screen min-h-fit bg-white  lg:p-y-16 py-5 lg:px-6 px-0 rounded-lg lg:border border-neutral-50 flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 overflow-auto">
            {props.sideBar}
            <div className="flex-1 lg:pl-14">{props.children}</div>
        </div>)
}

export default DashboardCommonRootLayout