import {  useAppSelector } from "../../store/hooks";
import { twMerge } from "tailwind-merge";
import SurfaceIcon from "../../icons/surface.svg";
import { useState } from "react";

export default function Surface() {
  const [splashScreen, setSplashScreen] = useState<boolean>(true);
  const global = useAppSelector((state) => state.global);
  //   const Surface = useAppSelector((state) => state.Surface);
  const show = global.isHome === false && global.activeApp === "surface";
  
  if(show) setTimeout(() => setSplashScreen(false), 4000);

  return (
    <>
      <div
        className={twMerge(
          "pointer-events-none absolute bottom-0 left-0 right-0 top-0 m-auto h-[90%] w-[90%] bg-zinc-100 text-zinc-900 opacity-0 transition-all duration-300 dark:bg-zinc-900 dark:text-zinc-100",
          show && "pointer-events-auto h-full w-full opacity-100",
        )}
      >
        <div className={twMerge(
          "absolute top-0 left-0 right-0 bottom-0 m-auto flex h-full w-full items-center justify-center bg-blue-600 transition-all duration-500",
          !splashScreen && "h-28 w-28 rounded-full bottom-24"
        )}>
          <img
            src={SurfaceIcon}
            className={twMerge(
              "h-40 w-40 transition-all duration-500",
              !splashScreen && "h-28 w-28",
            )}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center p-10 text-center">
          <p className="mt-40 text-xl">
            Search with Bing or enter address, or leave blank to get redirected
            to BreezeOS official website.
          </p>
        </div>
      </div>
    </>
  );
}
