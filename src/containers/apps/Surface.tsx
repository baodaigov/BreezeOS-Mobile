import { useAppSelector } from "../../store/hooks";
import { twMerge } from "tailwind-merge";
import SurfaceIcon from "../../icons/surface.svg";
import SurfaceNoBg from "../../icons/surface-nobg.svg";
import SurfaceNoBgD from "../../icons/surface-nobg-d.svg";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import ActionButton from "../../components/ActionButton";
import { HiOutlineMenu } from "react-icons/hi";
import { TbBoxMultiple } from "react-icons/tb";
import { openUrl } from "../../store/reducers/apps/surface";
import { LuRotateCcw } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import Hammer from "react-hammerjs";

export default function Surface() {
  const dispatch = useDispatch();
  const url = useAppSelector((state) => state.surface.url);
  const [splashScreen, setSplashScreen] = useState<boolean>(true);
  const [hist, setHist] = useState<string[]>(["", ""]);
  const [inputValue, setInputValue] = useState<string>("");
  const [navDisplayed, setNavDisplayed] = useState<boolean>(false);
  const [navMinimized, setNavMinimized] = useState<boolean>(false);
  const [selectTabDisplayed, setDisplaySelectTab] = useState<boolean>(false);
  const global = useAppSelector((state) => state.global);
  const show = global.isHome === false && global.activeApp === "surface";
  const surfaceFrameRef = useRef<HTMLIFrameElement>(null);

  if (show) setTimeout(() => setSplashScreen(false), 5000);

  useEffect(() => {
    if (!splashScreen) setNavDisplayed(true);

    if (selectTabDisplayed) {
      setNavDisplayed(false);
    } else {
      setNavDisplayed(true);
    }
  }, [splashScreen, selectTabDisplayed]);

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  const action = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      var qry = inputValue;

      if (isValidURL(qry)) {
        if (!qry.startsWith("http")) {
          qry = "https://" + qry;
        }
      } else if (qry === "") {
        qry = "https://breezeos.github.io";
      } else {
        qry = "https://www.bing.com/search?q=" + encodeURIComponent(qry);
      }

      setInputValue(qry);
      setHist([hist[0], qry]);
      dispatch(openUrl(qry));
    }
  };

  function reload() {
    const frameSrc = surfaceFrameRef.current;
    if (frameSrc) {
      frameSrc.src = frameSrc.src;
    }
  }

  return (
    <>
      <div
        className={twMerge(
          "pointer-events-none absolute bottom-0 left-0 right-0 top-0 m-auto h-[90%] w-[90%] bg-zinc-100 text-zinc-900 opacity-0 transition-all duration-300 dark:bg-zinc-900 dark:text-zinc-100",
          show && "pointer-events-auto h-full w-full opacity-100",
        )}
      >
        {url === "" ? (
          <>
            <div
              className={twMerge(
                "absolute bottom-0 left-0 right-0 top-0 m-auto flex h-full w-full items-center justify-center bg-blue-600 transition-all duration-500",
                !splashScreen && "bottom-24 h-28 w-28 rounded-full",
              )}
            >
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
                Search with Bing or enter address, or leave blank to get
                redirected to BreezeOS official website.
              </p>
            </div>
          </>
        ) : (
          <div className="h-full bg-zinc-100 pt-8 dark:bg-zinc-900">
            <img className="absolute top-12 h-9 w-full hidden dark:block" src={SurfaceNoBg} />
            <img className="absolute top-12 h-9 w-full dark:hidden" src={SurfaceNoBgD} />
            <div className="relative h-full">
              <div
                className={twMerge(
                  "absolute bottom-0 left-0 right-0 top-0 m-auto h-full overflow-hidden bg-white transition-all duration-300",
                  selectTabDisplayed &&
                    "h-[75%] w-[80%] rounded-xl outline outline-4 outline-offset-4 outline-blue-500 active:outline-blue-800 dark:active:outline-blue-300 active:transition-none",
                )}
              >
                <div
                  className={twMerge(
                    "pointer-events-none flex h-0 items-center justify-between bg-zinc-900 px-4 text-zinc-100 transition-all duration-300 dark:bg-zinc-100 dark:text-zinc-900",
                    selectTabDisplayed && "pointer-events-auto h-10",
                  )}
                >
                  <p className="text-[13px]">{url && url}</p>
                  {url && (
                    <ActionButton
                      className="p-1 text-[17px] transition-all duration-300 active:bg-zinc-100/10 active:transition-none dark:active:bg-zinc-900/10"
                      onClick={() => {
                        dispatch(openUrl(""));
                        setDisplaySelectTab(false);
                      }}
                    >
                      <HiMiniXMark />
                    </ActionButton>
                  )}
                </div>
                <div
                  className="h-full"
                  onClick={() => {
                    setDisplaySelectTab(false);
                    setNavDisplayed(true);
                  }}
                >
                  <div
                    className={`h-full ${
                      selectTabDisplayed && "pointer-events-none"
                    }`}
                  >
                    <iframe
                      ref={surfaceFrameRef}
                      frameBorder={0}
                      className="h-full w-full"
                      src={url}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={twMerge(
            "absolute -bottom-full w-full pb-1 transition-all duration-500",
            navDisplayed && "bottom-0",
            navMinimized && "-bottom-24",
          )}
        >
          <div
            className={twMerge(
              "relative mx-1 rounded-2xl bg-zinc-100/80 px-3 pb-8 backdrop-blur-md transition-all duration-300 dark:bg-zinc-800/80",
              navMinimized &&
                "active:bg-zinc-400/50 active:transition-none dark:active:bg-zinc-700/80",
            )}
            style={{ height: "146px" }}
            onClick={() => navMinimized && setNavMinimized(false)}
          >
            <Hammer
              onSwipeDown={() => setNavMinimized(true)}
              direction="DIRECTION_DOWN"
            >
              <div className="flex justify-center pb-3 pt-2">
                <div className="rounded-full bg-zinc-800/10 px-6 py-[3px] dark:bg-zinc-100/10"></div>
              </div>
            </Hammer>
            <div
              className={`absolute w-[94%] transition-all duration-500 ${
                navMinimized && "pointer-events-none opacity-0"
              }`}
            >
              <div className="flex items-center justify-between">
                <input
                  className="w-full appearance-none rounded-xl border-none bg-zinc-800/[.03] px-4 py-2 text-sm outline-none placeholder:text-zinc-900/20 dark:bg-zinc-100/[.03] dark:placeholder:text-zinc-100/20"
                  spellCheck={false}
                  autoComplete="0"
                  value={inputValue}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputValue(e.target.value)
                  }
                  onKeyDown={action}
                  placeholder="Search with Bing or enter address..."
                />
                <ActionButton
                  className="ml-2 p-2 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={reload}
                >
                  <LuRotateCcw />
                </ActionButton>
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-2xl">
                <ActionButton
                  className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={() => dispatch(openUrl(hist[0]))}
                >
                  <FiChevronLeft />
                </ActionButton>
                <ActionButton
                  className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={() => dispatch(openUrl(hist[1]))}
                >
                  <FiChevronRight />
                </ActionButton>
                <ActionButton className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10">
                  <FiPlus />
                </ActionButton>
                <ActionButton className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10">
                  <HiOutlineMenu />
                </ActionButton>
                <ActionButton
                  className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={() => url && setDisplaySelectTab(true)}
                >
                  <TbBoxMultiple />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
