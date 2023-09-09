import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ActionButton from "./ActionButton";
import { setKeyboardActive } from "../store/reducers/keyboard";
import Hammer from "react-hammerjs";
import { HiMiniXMark } from "react-icons/hi2";
import { FiChevronLeft, FiGlobe } from "react-icons/fi";
import {
  PiBowlFoodBold,
  PiFlagBold,
  PiLightbulbBold,
  PiSmileyBold,
} from "react-icons/pi";
import { RiBearSmileLine, RiCharacterRecognitionLine } from "react-icons/ri";
import { MdKeyboardReturn, MdOutlineCardTravel } from "react-icons/md";
import { HiOutlineBackspace } from "react-icons/hi";
import { TbCircleArrowUp, TbCircleArrowUpFilled } from "react-icons/tb";
import { BiFootball } from "react-icons/bi";

interface KeyboardProps {
  theme?: "dark" | "light";
}

export default function Keyboard({ theme = "dark" }: KeyboardProps) {
  const dispatch = useAppDispatch();
  const keyboard = useAppSelector((state) => state.keyboard);
  const lang = useAppSelector((state) => state.keyboard.lang);
  const [char, setChar] = useState<string[]>([]);

  const keysArray = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["-", "/", ":", ";", "(", ")", "$", "&", "@", '"'],
    ["shift", ".", ",", "?", "!", "'", "backspace"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
    ["123", "lang", "emoji", "space", "return"],
  ];

  const emojiArray = [
    {
      smileyAndPeople: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "🥹",
        "😅",
        "😂",
        "🤣",
        "🥲",
        "☺️",
      ],
    },
  ];

  const alpha = "abcdefghijklmnopqrstuvwxyz";

  const [keysType, setKeysType] = useState<string[][] | null>(null);
  const [emojiKeyboard, setEmojiKeyboard] = useState<boolean>(false);
  const [emojiType, setEmojiType] = useState<string>("Smiley & People");
  const [langIndex, setLangIndex] = useState<number>(0);
  const [shift, setShift] = useState<boolean>(false);
  const [num, setNum] = useState<boolean>(false);
  const currentLang = lang[langIndex];

  useEffect(() => {
    const keys: string[][] = JSON.parse(JSON.stringify(keysArray)).slice(3);
    setKeysType(keys);

    const numKeys: string[][] = JSON.parse(JSON.stringify(keysArray));
    numKeys.splice(3, 3);

    const capitalKeys: string[][] = JSON.parse(JSON.stringify(keysArray)).slice(
      3,
    );
    const alphabet = alpha.split("");

    capitalKeys.forEach((arr) => {
      arr.forEach((key, index, _arr) => {
        if (key.length === 1 && alphabet.indexOf(key) > -1) {
          _arr[index] = shift ? key.toUpperCase() : key.toLowerCase();
        }
      });
    });

    if (!keyboard.active) {
      setShift(false);
      setNum(false);
      setEmojiKeyboard(false);
    }

    if (shift) {
      setKeysType(capitalKeys);
    }

    if (num) {
      setKeysType(numKeys);
      if (shift) {
        numKeys.splice(
          0,
          2,
          ["[", "]", "{", "}", "#", "%", "^", "*", "+", "="],
          ["_", "\\", "|", "~", "<", ">", "€", "£", "¥", "•"],
        );
      }
    }
  }, [shift, num, keyboard]);

  function keyClick(key: string) {
    const k = key && key.trim();
    if (k === "backspace") return setChar(char.slice(0, -1));
    if (k === "shift") return setShift(!shift);
    if (k === "123") return setNum(!num);
    if (k === "return") return setChar([...char, " "]);
    if (k === "space") return setChar([...char, " "]);
    if (k === "lang")
      return setTimeout(
        () => setLangIndex((prev) => (prev === lang.length - 1 ? 0 : prev + 1)),
        100,
      );
    if (k === "emoji") return setEmojiKeyboard(true);

    return setChar([...char, key]);
  }

  function generate(key: string) {
    switch (key) {
      case "a":
        return (
          <Hammer
            onTap={() => keyClick(key)}
            onPress={() => console.log("ok")}
            onPressUp={() => console.log("ok 2")}
            options={{
              recognizers: {
                press: {
                  time: 350,
                },
              },
            }}
          >
            <div
              className={twMerge(
                `relative m-[3px] flex w-[38px] items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none`,
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <p>a</p>
            </div>
          </Hammer>
        );
      case "backspace":
        return (
          <Hammer onTap={() => keyClick(key)}>
            <div
              className={twMerge(
                `relative m-[3px] flex w-[60px] items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none ${
                  num && "w-[104px]"
                }`,
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <HiOutlineBackspace />
            </div>
          </Hammer>
        );
      case "shift":
        return (
          <Hammer
            onPress={() => keyClick(key)}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div
              className={twMerge(
                `relative m-[3px] flex w-[60px] items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none ${
                  num && "w-[104px]"
                }`,
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              {shift ? <TbCircleArrowUpFilled /> : <TbCircleArrowUp />}
            </div>
          </Hammer>
        );
      case "123":
        return (
          <Hammer
            onPress={() => keyClick(key)}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div
              className={twMerge(
                "relative m-[3px] flex w-10 items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-xs text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none",
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <p>{num && key === "123" ? "ABC" : key}</p>
            </div>
          </Hammer>
        );
      case "emoji":
        return (
          <Hammer onTap={() => keyClick(key)}>
            <div
              className={twMerge(
                "relative m-[3px] flex w-8 items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none",
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <PiSmileyBold />
            </div>
          </Hammer>
        );
      case "lang":
        return (
          <Hammer onTap={() => keyClick(key)}>
            <div
              className={twMerge(
                "relative m-[3px] flex w-8 items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none",
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <FiGlobe />
            </div>
          </Hammer>
        );
      case "space":
        return (
          <Hammer onTap={() => keyClick(key)}>
            <div
              className={twMerge(
                "relative m-[3px] flex w-[198px] items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-xs text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none",
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <p>{currentLang}</p>
            </div>
          </Hammer>
        );
      case "return":
        return (
          <Hammer onTap={() => keyClick(key)}>
            <div
              className={twMerge(
                "relative m-[3px] flex w-28 items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none",
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <MdKeyboardReturn />
            </div>
          </Hammer>
        );
      default:
        return (
          <Hammer onTap={() => keyClick(key)}>
            <div
              className={twMerge(
                "relative m-[3px] flex w-[38px] items-center justify-center rounded-md bg-zinc-100/20 px-1 py-3 text-zinc-800 transition-all duration-300 active:-translate-y-1 active:bg-zinc-100/40 active:transition-none",
                theme === "dark" &&
                  "bg-zinc-500/5 text-zinc-100 active:bg-zinc-400/10",
              )}
            >
              <p>{key}</p>
            </div>
          </Hammer>
        );
    }
  }

  function renderEmoji() {
    switch (emojiType) {
      case "Smiley & People":
        return (
          <>
            {emojiArray.map((type) =>
              type.smileyAndPeople.map((key) => (
                <Hammer onTap={() => keyClick(key)}>
                  <div className="inline-block text-3xl transition-all duration-300 active:brightness-75 active:transition-none">
                    <p>{key}</p>
                  </div>
                </Hammer>
              )),
            )}
          </>
        );
    }
  }

  return (
    <>
      {keyboard.active && (
        <div className="absolute top-8 w-full rounded-2xl bg-zinc-900 py-6 text-center font-bold text-zinc-100">
          <p className="text-xl">{char.join("")}</p>
        </div>
      )}
      <div
        className={twMerge(
          "pointer-events-none absolute -bottom-full w-full pb-1 opacity-0 transition-all duration-500",
          keyboard.active && "pointer-events-auto bottom-0 opacity-100",
        )}
      >
        <div
          className={twMerge(
            "mx-1 rounded-2xl bg-zinc-100/80 px-2 py-2 pb-8 text-zinc-900 backdrop-blur-md transition-all duration-500",
            theme === "dark" && "bg-zinc-900/80 text-zinc-100",
          )}
          style={{
            height: !emojiKeyboard ? "286px" : "336px",
          }}
        >
          <div className="relative mb-1 flex h-[34px] w-full flex-row-reverse px-1">
            {/* <ActionButton
              className={twMerge(
                "p-2 text-lg transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                theme === "dark" && "active:bg-zinc-200/5",
              )}
              onClick={() => dispatch(setKeyboardSound(!keyboard.sound))}
            >
              {keyboard.sound ? <HiOutlineVolumeUp /> : <HiOutlineVolumeOff />}
            </ActionButton> */}
            <ActionButton
              className={twMerge(
                "p-2 text-lg transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                theme === "dark" && "active:bg-zinc-200/5",
              )}
              onClick={() => dispatch(setKeyboardActive(false))}
            >
              <HiMiniXMark />
            </ActionButton>
            <div
              className={twMerge(
                "pointer-events-none absolute flex h-full w-full items-center justify-center opacity-0 transition-all duration-300",
                emojiKeyboard && "opacity-100",
              )}
            >
              <p className="text-sm">{emojiType}</p>
            </div>
          </div>
          <div className="relative h-full w-full">
            <div
              className={twMerge(
                "pointer-events-none absolute flex w-full flex-col opacity-0 transition-all duration-300",
                !emojiKeyboard && "pointer-events-auto opacity-100",
              )}
            >
              {keysType?.map((keys) => (
                <div className="flex w-full justify-center">
                  {keys.map((key) => (
                    <>{generate(key)}</>
                  ))}
                </div>
              ))}
            </div>
            <div
              className={twMerge(
                "pointer-events-none absolute flex h-full w-full flex-col justify-between px-1 opacity-0 transition-all duration-300",
                emojiKeyboard && "pointer-events-auto opacity-100",
              )}
            >
              <div className="flex w-full justify-center space-x-1 px-2">
                {renderEmoji()}
              </div>
              <div className="flex w-full justify-between pb-11">
                <ActionButton
                  className={twMerge(
                    "p-2 transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                    theme === "dark" && "active:bg-zinc-200/5",
                  )}
                  onClick={() => setEmojiKeyboard(false)}
                >
                  <FiChevronLeft className="text-xl" />
                </ActionButton>
                <div
                  className={twMerge(
                    "flex items-center rounded-full bg-zinc-800/10 p-[3px]",
                    theme === "dark" && "bg-zinc-200/5",
                  )}
                >
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Smiley & People" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Smiley & People")}
                  >
                    <PiSmileyBold />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Animal & Nature" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Animal & Nature")}
                  >
                    <RiBearSmileLine />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Food & Drink" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Food & Drink")}
                  >
                    <PiBowlFoodBold />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Activity" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Activity")}
                  >
                    <BiFootball />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Travel & Places" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Travel & Places")}
                  >
                    <MdOutlineCardTravel />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Objects" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Objects")}
                  >
                    <PiLightbulbBold />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Symbols" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Symbols")}
                  >
                    <RiCharacterRecognitionLine />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                      emojiType === "Flags" &&
                        `bg-zinc-800/10 active:bg-zinc-800/20 ${
                          theme === "dark" &&
                          "bg-zinc-200/5 active:bg-zinc-200/10"
                        }`,
                    )}
                    onClick={() => setEmojiType("Flags")}
                  >
                    <PiFlagBold />
                  </ActionButton>
                  <ActionButton
                    className={twMerge(
                      "p-2 text-sm transition-all duration-300 active:bg-zinc-800/10 active:transition-none",
                      theme === "dark" && "active:bg-zinc-200/5",
                    )}
                    onClick={() => setChar(char.slice(0, -1))}
                  >
                    <HiOutlineBackspace />
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
