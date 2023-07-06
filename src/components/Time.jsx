import { useEffect, useState } from "react";

export default function Time({ className }){
    const [curTime, setCurTime] = useState(null);

    useEffect(() => {
        if(curTime === null){
            setCurTime(new Date().toLocaleString('en-US', {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            }));
        } else {
            setInterval(() => {
                setCurTime(new Date().toLocaleString('en-US', {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }));
            }, 1000);
        }
    }, [curTime]);

    return <p className={className}>{curTime}</p>
}