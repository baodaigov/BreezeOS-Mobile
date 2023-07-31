import { useEffect, useState } from "react";

interface DateObjProps {
    className?: string,
    dateStyle?: string | any
}

export default function DateObj({ className, dateStyle = 'medium' }: DateObjProps){
    const [curDate, setCurDate] = useState<string | any>(null);

    useEffect(() => {
        if(curDate === null){
            setCurDate(new Date().toLocaleString('en-US', {
                dateStyle: dateStyle
            }));
        } else {
            setInterval(() => {
                setCurDate(new Date().toLocaleString('en-US', {
                    dateStyle: dateStyle
                }));
            }, 1000);
        }
    }, [curDate]);

    return <p className={className}>{curDate}</p>
}