"use client"

import { useTimeAgo } from 'next-timeago';

export const TimeAgo = ({ date, className }: { date: Date, className?: string }) => {
    const { TimeAgo } = useTimeAgo();

    return (
        <p className={className}>
            <TimeAgo date={date} locale='en' />
        </p>
    );
}