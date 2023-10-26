import { useAppSelector } from "@/store/hooks";
import { twMerge } from "tailwind-merge";

export default function SplashScreen() {
  const screenSplash = useAppSelector((state) => state.global.screenSplash);

  return (
    <div
      className={twMerge(
        "pointer-events-none absolute z-50 flex h-screen w-full items-center justify-center bg-black opacity-0",
        screenSplash && "pointer-events-auto opacity-100",
      )}
    >
      <p className="text-5xl font-bold text-white">BreezeOS</p>
    </div>
  );
}
