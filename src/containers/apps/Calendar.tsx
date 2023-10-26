import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/store/hooks";
import Hammer from "react-hammerjs";
import ActionButton from "@/components/ActionButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import dayjs from "dayjs";
import range from "lodash-es/range";
import { useState } from "react";

export default function Calendar() {
  const global = useAppSelector((state) => state.global);
  const show = global.isHome === false && global.activeApp === "calendar";
  const [dayObj, setDayObj] = useState(dayjs());
  const todayObj = dayjs();
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const thisYear = dayObj.year();
  const thisMonth = dayObj.month();
  const daysInMonth = dayObj.daysInMonth();

  const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
  const weekDayOf1 = dayObjOf1.day();

  const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`);
  const weekDayOfLast = dayObjOfLast.day();

  return (
    <div
      className={twMerge(
        "pointer-events-none absolute bottom-0 left-0 right-0 top-0 m-auto h-[90%] w-[90%] bg-zinc-100 text-zinc-900 opacity-0 transition-all duration-300 dark:bg-zinc-900 dark:text-zinc-100",
        show && "pointer-events-auto h-full w-full opacity-100",
      )}
    >
      <Hammer
        onSwipeLeft={() => setDayObj(dayObj.add(1, "month"))}
        onSwipeRight={() => setDayObj(dayObj.subtract(1, "month"))}
      >
        <div className="flex h-full flex-col space-y-2 px-4">
          <div className="mb-24 mt-9 h-full">
            <div className="mb-4 flex justify-between space-x-2 pr-2">
              {weekDays.map((i) => (
                <div className="w-[14%]">
                  <p className="float-right text-sm">{i}</p>
                </div>
              ))}
            </div>
            <div className="flex h-full flex-wrap justify-between [&_p]:float-right [&_p]:flex [&_p]:h-8 [&_p]:w-8 [&_p]:items-center [&_p]:justify-center">
              {range(weekDayOf1).map((i) => (
                <div className="w-[14%] py-2 pl-2">
                  <p
                    className="flex h-8 w-8 items-center justify-center text-zinc-900/10 dark:text-zinc-100/10"
                    key={i}
                  >
                    {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                  </p>
                </div>
              ))}

              {range(daysInMonth).map((i) => (
                <div className="w-[14%] py-2 pl-2">
                  <p
                    className={
                      i + 1 === todayObj.date() &&
                      thisMonth === todayObj.month() &&
                      thisYear === todayObj.year()
                        ? "flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 font-bold text-zinc-100 text-zinc-900/10 dark:bg-zinc-100 dark:text-zinc-100/10 dark:text-zinc-900"
                        : ""
                    }
                    key={i}
                  >
                    {i + 1}
                  </p>
                </div>
              ))}

              {range(6 - weekDayOfLast).map((i) => (
                <div className="w-[14%] py-2 pl-2">
                  <p
                    className="flex h-8 w-8 items-center justify-center text-zinc-900/10 dark:text-zinc-100/10"
                    key={i}
                  >
                    {dayObjOfLast.add(i + 1, "day").date()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Hammer>
      <div className="absolute bottom-10 w-full pb-1 transition-all duration-500">
        <div className="mx-10 rounded-full bg-zinc-200/80 text-xl backdrop-blur-md transition-all duration-300 dark:bg-zinc-800/80">
          <Hammer
            onSwipeLeft={() => setDayObj(dayObj.add(1, "month"))}
            onSwipeRight={() => setDayObj(dayObj.subtract(1, "month"))}
          >
            <div className="flex items-center justify-between p-1">
              <ActionButton
                className={twMerge(
                  "p-2 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10",
                )}
                onClick={() => setDayObj(dayObj.subtract(1, "month"))}
              >
                <FiChevronLeft />
              </ActionButton>
              <p className="text-sm">{dayObj.format("MMM DD, YYYY")}</p>
              <ActionButton
                className={twMerge(
                  "p-2 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10",
                )}
                onClick={() => setDayObj(dayObj.add(1, "month"))}
              >
                <FiChevronRight />
              </ActionButton>
            </div>
          </Hammer>
        </div>
      </div>
    </div>
  );
}
