import { useEffect, useState } from "react";

export default function DateObj({ className, dateStyle = 'medium' }){
    const [curDate, setCurDate] = useState(null);

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