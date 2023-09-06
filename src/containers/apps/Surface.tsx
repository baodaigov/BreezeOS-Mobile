import { useAppSelector } from "../../store/hooks";
import { twMerge } from "tailwind-merge";
import SurfacePrivate from "../../icons/surface-private.svg";
import SurfaceNoBg from "../../icons/surface-nobg.svg";
import SurfaceNoBgD from "../../icons/surface-nobg-d.svg";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import ActionButton from "../../components/ActionButton";
import { HiOutlineMenu } from "react-icons/hi";
import { TbBoxMultiple } from "react-icons/tb";
import { openUrl, setSearchEngine } from "../../store/reducers/apps/surface";
import { LuRotateCcw } from "react-icons/lu";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import Hammer from "react-hammerjs";
import Toggle from "../../components/Toggle";
import { IoChevronBack, IoClose } from "react-icons/io5";
import { VscChevronRight } from "react-icons/vsc";
import { IoMdCheckmark } from "react-icons/io";

export default function Surface() {
  interface WebsiteItemType {
    title: string;
    url: string;
  }
  const dispatch = useDispatch();
  const surface = useAppSelector((state) => state.surface);
  const url = useAppSelector((state) => state.surface.url);
  const wifi = useAppSelector((state) => state.settings.wifi);
  const [splashScreen, setSplashScreen] = useState<boolean>(false);
  const [privateMode, setPrivateMode] = useState<boolean>(false);
  const [menuDisplayed, setDisplayMenu] = useState<boolean>(false);
  const [searchEngineMenuDisplayed, setDisplaySearchEngineMenu] =
    useState<boolean>(false);
  const [menuSection, setMenuSection] = useState<string>("settings");
  const [hist, setHist] = useState<string[]>(["", ""]);
  const bookmarks: WebsiteItemType[] = [
    {
      title: "BreezeOS Mobile",
      url: "https://breezeos.github.io",
    },
  ];
  const [history, setHistory] = useState<WebsiteItemType[]>([
    {
      title: "BreezeOS Mobile",
      url: "https://breezeos.github.io",
    },
  ]);
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
  }, [splashScreen]);

  const isValidURL = (string: string) => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    );
    return res !== null;
  };

  function action(e: React.KeyboardEvent<HTMLInputElement>) {
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
      if (!privateMode) {
        setHistory([
          {
            title: isValidURL(inputValue) ? qry : `${inputValue} – Bing Search`,
            url: qry,
          },
          ...history,
        ]);
      }
    }
  }

  function reload() {
    const frameSrc = surfaceFrameRef.current;
    if (frameSrc) {
      frameSrc.src = frameSrc.src;
    }
  }

  function useOutsideMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target))
          setDisplayMenu(false);
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const menuRef = useRef(null);
  useOutsideMenu(menuRef);

  const WebsiteItem: React.FC<WebsiteItemType> = ({ title, url }) => {
    return (
      <div
        className="flex w-full items-center justify-between rounded-full px-6 py-4 text-zinc-800 transition-all duration-300 last:mb-10 active:bg-zinc-800/10 active:transition-none dark:text-zinc-100 dark:active:bg-zinc-100/5"
        onClick={() => {
          setDisplayMenu(false);
          setInputValue(url);
          dispatch(openUrl(url));
        }}
      >
        <div className="flex items-center">
          <div className="flex flex-col">
            <p className="mb-1 text-lg">{title}</p>
            <p className="text-xs text-zinc-500">{url}</p>
          </div>
        </div>
        <VscChevronRight className="text-xl text-zinc-700" />
      </div>
    );
  };

  function renderMenuTab() {
    switch (menuSection) {
      case "bookmarks":
        return (
          <div className="flex w-full flex-col py-2">
            {bookmarks.map((i) => (
              <WebsiteItem title={i.title} url={i.url} />
            ))}
          </div>
        );
      case "settings":
        return (
          <div className="w-full space-y-2 py-4">
            <div className="flex items-center justify-between px-6 py-5">
              <p className="text-sm font-bold">Private mode</p>
              <Toggle
                active={privateMode}
                onToggle={() => setPrivateMode(!privateMode)}
              />
            </div>
            <div
              className="flex w-full items-center justify-between rounded-full px-6 py-5 transition-all duration-300 active:bg-zinc-800/10 active:transition-none dark:text-zinc-100 dark:active:bg-zinc-100/5"
              onClick={() => setDisplaySearchEngineMenu(true)}
            >
              <p className="text-sm font-bold">Search engine</p>
              <div className="flex items-center space-x-1">
                <p className="text-sm text-zinc-400 dark:text-zinc-700">{surface.searchEngine}</p>
                <VscChevronRight className="text-lg text-zinc-400 dark:text-zinc-700" />
              </div>
            </div>
          </div>
        );
      case "history":
        return (
          <div className="relative flex h-[86%] w-full">
            <div className="h-full w-full">
              <div className="flex h-full w-full flex-col overflow-auto py-2">
                {history.map((i) => (
                  <WebsiteItem title={i.title} url={i.url} />
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 flex w-full flex-row-reverse bg-gradient-to-t from-zinc-950 to-transparent pb-2">
              <ActionButton
                onClick={() => setHistory([])}
                className={twMerge(
                  "px-4 py-2 text-blue-500 transition-all duration-300 active:bg-blue-500/10 active:backdrop-blur-sm active:transition-none",
                  !history.length &&
                    "pointer-events-none text-zinc-900 opacity-10 dark:text-zinc-100",
                )}
              >
                <p className="text-sm">Clear all</p>
              </ActionButton>
            </div>
          </div>
        );
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
                privateMode && "bg-zinc-950",
              )}
            >
              {privateMode ? (
                <img
                  src={SurfacePrivate}
                  className={twMerge(
                    "h-40 w-40 transition-all duration-500",
                    !splashScreen && "h-28 w-28",
                  )}
                />
              ) : (
                <img
                  src="https://raw.githubusercontent.com/breezeos/icons/main/breezeos-mobile/icons/surface.svg"
                  className={twMerge(
                    "h-40 w-40 transition-all duration-500",
                    !splashScreen && "h-28 w-28",
                  )}
                />
              )}
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
            <img
              className="absolute top-12 hidden h-9 w-full dark:block"
              src={SurfaceNoBg}
            />
            <img
              className="absolute top-12 h-9 w-full dark:hidden"
              src={SurfaceNoBgD}
            />
            {wifi ? (
              <div className="relative h-full">
                <div
                  className={twMerge(
                    "absolute bottom-0 left-0 right-0 top-0 m-auto h-full overflow-hidden bg-white transition-all duration-300",
                    selectTabDisplayed &&
                      `h-[75%] w-[80%] rounded-xl outline outline-4 outline-offset-4 ${
                        privateMode
                          ? "outline-zinc-900 active:outline-zinc-600 dark:outline-zinc-100 dark:active:outline-zinc-400"
                          : "outline-blue-500 active:outline-blue-800 dark:active:outline-blue-300"
                      } active:transition-none`,
                  )}
                >
                  <div
                    className={twMerge(
                      "pointer-events-none flex h-0 scale-0 items-center justify-between bg-zinc-900 px-4 text-zinc-100 transition-all duration-300 dark:bg-zinc-100 dark:text-zinc-900",
                      selectTabDisplayed &&
                        "pointer-events-auto h-10 scale-100",
                    )}
                  >
                    <p className="text-[13px]">{url && url}</p>
                    {url && (
                      <ActionButton
                        className="p-1 text-[17px] transition-all duration-300 active:bg-zinc-100/10 active:transition-none dark:active:bg-zinc-900/10"
                        onClick={() => {
                          dispatch(openUrl(""));
                          setDisplaySelectTab(false);
                          setNavDisplayed(true);
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
                    <iframe
                      ref={surfaceFrameRef}
                      frameBorder={0}
                      className={`h-full w-full ${
                        selectTabDisplayed && "pointer-events-none"
                      }`}
                      scrolling={selectTabDisplayed ? "no" : "yes"}
                      src={url}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center space-y-6 px-8 text-center">
                <p className="text-4xl font-bold">Internet is not enabled.</p>
                <p className="text-sm">
                  You need Internet connection in order to connect to this
                  website.
                </p>
                <ActionButton className="bg-blue-600 px-6 py-3 text-sm text-zinc-100 transition-all duration-300 active:bg-blue-700 active:transition-none">
                  <p className="font-bold">Reload</p>
                </ActionButton>
              </div>
            )}
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
              "relative mx-1 rounded-2xl bg-zinc-200/80 px-3 pb-8 backdrop-blur-md transition-all duration-300 dark:bg-zinc-800/80",
              navMinimized &&
                "active:bg-zinc-300/80 active:transition-none dark:active:bg-zinc-700/80",
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
                <ActionButton
                  className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={() => setDisplayMenu(true)}
                >
                  <HiOutlineMenu />
                </ActionButton>
                <ActionButton
                  className="h-10 w-10 transition-all duration-300 active:bg-zinc-700/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={() =>
                    url &&
                    wifi &&
                    setTimeout(() => {
                      setDisplaySelectTab(true);
                      setNavDisplayed(false);
                    }, 0)
                  }
                >
                  <TbBoxMultiple />
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
        <div
          className={twMerge(
            "pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full justify-center bg-black/90 opacity-0 transition-all duration-[250ms]",
            menuDisplayed && "pointer-events-auto opacity-100",
          )}
        >
          <div
            className={twMerge(
              "pointer-events-none absolute -bottom-full my-2 flex h-[85%] w-[97%] flex-col items-center overflow-hidden rounded-3xl bg-zinc-100 text-zinc-800 opacity-0 transition-all duration-[600ms] dark:bg-zinc-950 dark:text-zinc-100",
              menuDisplayed && "pointer-events-auto bottom-0 opacity-100",
            )}
            ref={menuRef}
          >
            <div className="relative flex h-full w-full flex-col px-6 py-5 pb-10">
              <div
                className={twMerge(
                  "absolute left-full z-10 my-2 flex h-full w-full flex-col bg-zinc-100 px-5 text-zinc-800 transition-all duration-500 dark:bg-zinc-950 dark:text-zinc-100",
                  searchEngineMenuDisplayed && "left-0",
                )}
              >
                <div className="flex w-full items-center">
                  <ActionButton
                    className="p-2 transition-all duration-500 active:bg-zinc-800/10 active:transition-none dark:active:bg-zinc-100/10"
                    onClick={() => setDisplaySearchEngineMenu(false)}
                  >
                    <IoChevronBack className="text-xl" />
                  </ActionButton>
                </div>
                <div className="px-2 py-5">
                  <p className="mb-6 ml-1 text-xl font-bold">
                    Choose a search engine
                  </p>
                  <div className="space-y-2">
                    <div
                      className="flex w-full items-center justify-between rounded-full px-6 py-5 transition-all duration-300 active:bg-zinc-800/10 active:transition-none dark:text-zinc-100 dark:active:bg-zinc-100/5"
                      onClick={() => {
                        setDisplaySearchEngineMenu(false);
                        dispatch(setSearchEngine("Bing"))
                      }}
                    >
                      <p className="text-sm font-bold">Bing</p>
                      {surface.searchEngine === "Bing" && <IoMdCheckmark className="text-lg text-blue-600" />}
                    </div>
                    <div
                      className="flex w-full items-center justify-between rounded-full px-6 py-5 transition-all duration-300 active:bg-zinc-800/10 active:transition-none dark:text-zinc-100 dark:active:bg-zinc-100/5"
                      onClick={() => {
                        setDisplaySearchEngineMenu(false);
                        dispatch(setSearchEngine("Google"))
                      }}
                    >
                      <p className="text-sm font-bold">Google</p>
                      {surface.searchEngine === "Google" && <IoMdCheckmark className="text-lg text-blue-600" />}
                    </div>
                    <div
                      className="flex w-full items-center justify-between rounded-full px-6 py-5 transition-all duration-300 active:bg-zinc-800/10 active:transition-none dark:text-zinc-100 dark:active:bg-zinc-100/5"
                      onClick={() => {
                        setDisplaySearchEngineMenu(false);
                        dispatch(setSearchEngine("DuckDuckGo"))
                      }}
                    >
                      <p className="text-sm font-bold">DuckDuckGo</p>
                      {surface.searchEngine === "DuckDuckGo" && <IoMdCheckmark className="text-lg text-blue-600" />}
                    </div>
                    <div
                      className="flex w-full items-center justify-between rounded-full px-6 py-5 transition-all duration-300 active:bg-zinc-800/10 active:transition-none dark:text-zinc-100 dark:active:bg-zinc-100/5"
                      onClick={() => {
                        setDisplaySearchEngineMenu(false);
                        dispatch(setSearchEngine("Yahoo Search"))
                      }}
                    >
                      <p className="text-sm font-bold">Yahoo Search</p>
                      {surface.searchEngine === "Yahoo Search" && <IoMdCheckmark className="text-lg text-blue-600" />}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex w-full flex-row-reverse items-center">
                <ActionButton
                  className="p-2 transition-all duration-500 active:bg-zinc-800/10 active:transition-none dark:active:bg-zinc-100/10"
                  onClick={() => setDisplayMenu(false)}
                >
                  <IoClose className="text-xl" />
                </ActionButton>
              </div>
              <div className="my-2 flex w-full rounded-full bg-zinc-200/60 p-[3px] dark:bg-zinc-900/40">
                <div
                  className={`flex w-full justify-center rounded-full py-2 transition-all duration-200 ${
                    menuSection === "bookmarks" &&
                    "bg-zinc-300/70 dark:bg-zinc-900/90"
                  }`}
                  onClick={() => setMenuSection("bookmarks")}
                >
                  <p className="text-xs">Bookmarks</p>
                </div>
                <div
                  className={`flex w-full justify-center rounded-full py-2 transition-all duration-200 ${
                    menuSection === "settings" &&
                    "bg-zinc-300/70 dark:bg-zinc-900/90"
                  }`}
                  onClick={() => setMenuSection("settings")}
                >
                  <p className="text-xs">Settings</p>
                </div>
                <div
                  className={`flex w-full justify-center rounded-full py-2 transition-all duration-200 ${
                    menuSection === "history" &&
                    "bg-zinc-300/70 dark:bg-zinc-900/90"
                  }`}
                  onClick={() => setMenuSection("history")}
                >
                  <p className="text-xs">History</p>
                </div>
              </div>
              {renderMenuTab()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
