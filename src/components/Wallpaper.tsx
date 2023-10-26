import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { openRecentTasks } from "@/store/reducers/global";
import ActionButton from "./ActionButton";

export default function Wallpaper() {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const wallpaper = useAppSelector((state) => state.global.wallpaper);
  // const [index, setIndex] = useState<number>(0);

  return (
    <div className="h-full w-full bg-zinc-950 text-zinc-100">
      <div className="flex h-full flex-col items-center justify-between px-5 py-16 text-center">
        <div className="mb-6">
          <p className="mb-3 text-3xl font-semibold">Recent Tasks</p>
          <p className="text-sm text-zinc-500">
            Swipe up to close a window. Or click a window to open it.
          </p>
        </div>
        <div
          className={twMerge(
            "absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-300",
            global.recentTasks.active &&
              "h-[450px] w-64 rounded-xl active:h-[424px] active:w-60",
          )}
          style={{ backgroundImage: `url(${wallpaper})` }}
          onClick={() => dispatch(openRecentTasks(false))}
        ></div>
        <div className="mt-6 flex justify-center">
          <ActionButton className="bg-zinc-100/5 px-5 py-3 active:bg-zinc-100/10">
            <p className="text-sm">Clear all</p>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
