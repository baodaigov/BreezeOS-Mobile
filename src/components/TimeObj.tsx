import { useEffect, useState } from "react";

interface TimeObjProps {
  className?: string;
}

export default function TimeObj({ className }: TimeObjProps) {
  const [curTime, setCurTime] = useState<string | null>(null);

  useEffect(() => {
    if (curTime === null) {
      setCurTime(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    } else {
      setInterval(() => {
        setCurTime(
          new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
      }, 1000);
    }
  }, [curTime]);

  return <p className={className}>{curTime}</p>;
}
