import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hammer from "react-hammerjs";
import ActionButton from "../../components/ActionButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { switchStyle } from "../../store/reducers/header";

export default function Calendar() {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const settings = useAppSelector((state) => state.settings);
  const show = global.isHome === false && global.activeApp === "calendar";
  if(show && !settings.darkMode){
    dispatch(switchStyle(true));
  } else {
    dispatch(switchStyle(false));
  }

  return (
    <div
      className={twMerge(
        "pointer-events-none absolute bottom-0 left-0 right-0 top-0 m-auto h-[90%] w-[90%] bg-zinc-100 text-zinc-900 opacity-0 transition-all duration-300 dark:bg-zinc-900 dark:text-zinc-100",
        show && "pointer-events-auto h-full w-full opacity-100",
      )}
    >
      <div className="absolute bottom-10 w-full pb-1 transition-all duration-500">
        <Hammer>
          <div className="mx-10 flex items-center justify-between rounded-full bg-zinc-200/80 p-1 text-xl backdrop-blur-md transition-all duration-300 dark:bg-zinc-800/80">
            <ActionButton
              className={twMerge(
                "p-2 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10",
              )}
            >
              <FiChevronLeft />
            </ActionButton>
            <p className="text-sm">Jan 1, 1970</p>
            <ActionButton
              className={twMerge(
                "p-2 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10",
              )}
            >
              <FiChevronRight />
            </ActionButton>
          </div>
        </Hammer>
      </div>
    </div>
  );
}
