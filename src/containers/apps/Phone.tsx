import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { twMerge } from "tailwind-merge";
import {
  setColor,
  setImage,
  setName,
  setPhoneNumber,
} from "../../store/reducers/apps/phone";
import EmergencyBg from "../../images/emergency-bg.jpeg";
import avatar1 from "../../images/cyplucastero.jpg";
import { BiSolidMicrophoneOff, BiPencil } from "react-icons/bi";
import { IoIosKeypad } from "react-icons/io";
import { FaVolumeUp } from "react-icons/fa";
import {
  IoBackspaceOutline,
  IoChatbubbleEllipses,
  IoCheckmarkCircleOutline,
  IoClose,
  IoKeypad,
  IoKeypadOutline,
} from "react-icons/io5";
import ActionButton from "../../components/ActionButton";
import Sound from "../../sounds/call.mp3";
import { BsStar, BsStarFill } from "react-icons/bs";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { HiOutlineUser, HiPhone, HiUser } from "react-icons/hi";
import {
  AiOutlineExclamation,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { signal } from "@preact/signals";
import Hammer from "react-hammerjs";
import ContactImgD from "../../images/contact-d.svg";
import ContactImgL from "../../images/contact-l.svg";
import { FiChevronLeft } from "react-icons/fi";
import { Contact } from "../../../types";
import { TbHistory, TbStar, TbStarFilled } from "react-icons/tb";

const history = signal<Contact[]>([]);

const favorite = signal<Contact[]>([]);

const contact = signal<Contact[]>([
  {
    name: "Dao Thanh Minh",
    image: null,
    number: "(682)-310-1496",
    color: "bg-sky-500",
  },
  {
    name: "Cyprus Lucastero",
    image: avatar1,
    number: "(420)-696-6969",
    color: "bg-lime-500",
  },
  {
    name: "Thanh Ha`",
    image: null,
    number: "+842488830157",
    color: "bg-indigo-600",
  },
  {
    name: "truong giang",
    image: null,
    number: "+842488819047",
    color: "bg-orange-400",
  },
]);

export default function Phone() {
  const keypad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const phone = useAppSelector((state) => state.phone);
  const settings = useAppSelector((state) => state.settings);
  const show = global.isHome === false && global.activeApp === "phone";
  const [number, setNumber] = useState<string[]>([]);
  const [addCallerActive, setAddCallerActive] = useState<boolean>(false);
  const [addCallerNumber, setAddCallerNumber] = useState<string>("");
  const [height, setHeight] = useState(451);
  const [instructionShown, setInstructionShow] = useState<boolean>(true);
  const [processStarted, setProcessStart] = useState<boolean>(false);
  const [completed, setComplete] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [nameValue, setNameValue] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [colorValue, setColorValue] = useState<string>("bg-red-500");
  const [section, setSection] = useState<number>(0);
  const emergencyNumber = "911";
  const historyValue = history.value;
  const favoriteValue = favorite.value;
  const contactValue = contact.value;
  const sound = new Audio(Sound);
  const [callEnded, setCallEnded] = useState<boolean>(false);

  const colorPalette = [
    {
      color: "bg-red-500",
      active: colorValue === "bg-red-500",
    },
    {
      color: "bg-pink-500",
      active: colorValue === "bg-pink-500",
    },
    {
      color: "bg-purple-600",
      active: colorValue === "bg-purple-600",
    },
    {
      color: "bg-purple-700",
      active: colorValue === "bg-purple-700",
    },
    {
      color: "bg-indigo-600",
      active: colorValue === "bg-indigo-600",
    },
    {
      color: "bg-sky-500",
      active: colorValue === "bg-sky-500",
    },
    {
      color: "bg-sky-600",
      active: colorValue === "bg-sky-600",
    },
    {
      color: "bg-cyan-500",
      active: colorValue === "bg-cyan-500",
    },
    {
      color: "bg-teal-500",
      active: colorValue === "bg-teal-500",
    },
    {
      color: "bg-emerald-500",
      active: colorValue === "bg-emerald-500",
    },
    {
      color: "bg-emerald-300",
      active: colorValue === "bg-emerald-300",
    },
    {
      color: "bg-lime-400",
      active: colorValue === "bg-lime-400",
    },
    {
      color: "bg-yellow-300",
      active: colorValue === "bg-yellow-300",
    },
    {
      color: "bg-amber-400",
      active: colorValue === "bg-amber-400",
    },
    {
      color: "bg-orange-400",
      active: colorValue === "bg-orange-400",
    },
  ];

  function setDefault() {
    setProcessStart(false);
    setInstructionShow(true);
    setComplete(false);
    setIndex(0);
  }

  function useOutsideAddCallerMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setAddCallerActive(false);
          setDefault();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const addCallerMenuRef = useRef(null);
  useOutsideAddCallerMenu(addCallerMenuRef);

  function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  }

  interface AvatarProps {
    name: string;
    image: any;
    color?: string | null;
    size?: number;
    fontSize?: number;
    isEmergency?: boolean;
    children?: React.ReactNode;
  }

  const Avatar: React.FC<AvatarProps> = ({
    name,
    image,
    color,
    size = 40,
    fontSize = 16,
    isEmergency,
    children,
  }) => {
    return (
      <>
        {isEmergency ? (
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-full bg-red-500 text-gray-800"
            style={{ width: size, height: size, fontSize: fontSize }}
          >
            <AiOutlineExclamation />
          </div>
        ) : (
          <div
            className={`relative flex items-center justify-center overflow-hidden rounded-full text-gray-100 ${
              image === null && color
            }`}
            style={{ width: size, height: size, fontSize: fontSize }}
          >
            {image === null ? (
              <>
                {name !== "" ? (
                  <p className="font-semibold">
                    {name.charAt(0).toUpperCase()}
                  </p>
                ) : (
                  <AiOutlineUser className="h-full w-full bg-sky-600 text-gray-800" />
                )}
              </>
            ) : (
              <img className="h-full w-full" src={image} />
            )}
            {children}
          </div>
        )}
      </>
    );
  };

  const Contact: React.FC<Contact> = ({ name, image, number, color }) => {
    const [contactShown, setContactShown] = useState(false);
    const [isFavorite, setFavorite] = useState<boolean>(false);

    useEffect(() => {
      if (isFavorite) {
        const newFavorite = [
          ...favoriteValue,
          {
            name: name,
            image: image,
            number: number,
            color: color,
          },
        ];

        favorite.value = newFavorite;
      }
    }, [favorite, isFavorite]);

    return (
      <>
        <div className="w-full px-2 py-1">
          <div
            className="flex w-full items-center justify-between rounded-full p-4 text-gray-800 transition-all duration-300 active:bg-gray-800/10 active:transition-none dark:text-gray-100 dark:active:bg-gray-100/5"
            onClick={() => setContactShown(true)}
          >
            <div className="flex items-center">
              <Avatar
                name={name}
                image={image}
                color={color}
                isEmergency={number === emergencyNumber && true}
              />
              <div className="ml-3 flex flex-col">
                <p className="mb-1 font-bold">
                  {number === emergencyNumber
                    ? "Emergency service"
                    : name !== ""
                    ? name
                    : `${number}`}
                </p>
                <p className="text-xs text-gray-500">{number && number}</p>
              </div>
            </div>
            <VscChevronRight className="text-xl text-gray-500" />
          </div>
        </div>
        <div
          className={twMerge(
            "pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 m-auto flex h-[90%] w-[90%] flex-col bg-zinc-100 px-4 py-8 text-gray-800 opacity-0 transition-all duration-300 dark:bg-zinc-900 dark:text-gray-100",
            contactShown && "pointer-events-auto h-full w-full opacity-100",
          )}
        >
          <div className="mb-4 flex justify-between">
            <ActionButton
              className="p-2 transition-all duration-200 active:bg-gray-800/10 active:transition-none dark:active:bg-gray-100/10"
              onClick={() => setContactShown(false)}
            >
              <VscChevronLeft className="text-xl" />
            </ActionButton>
            <ActionButton
              className="p-2 text-sky-600 transition-all duration-200 active:bg-sky-600/10 active:transition-none"
              onClick={() => setFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <BsStarFill className="text-lg" />
              ) : (
                <BsStar className="text-lg" />
              )}
            </ActionButton>
          </div>
          <div className="my-5 flex flex-col items-center">
            <Avatar
              name={name}
              image={image}
              color={color}
              size={96}
              fontSize={48}
              isEmergency={number === emergencyNumber && true}
            >
              {name !== "" && number !== "" && (
                <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-black/70 p-5 text-gray-100 opacity-0 hover:opacity-100">
                  <BiPencil className="text-3xl" />
                </div>
              )}
            </Avatar>
            <p className="mt-5 text-xl">
              {number === emergencyNumber
                ? "Emergency service"
                : name !== ""
                ? name
                : `${number}`}
            </p>
            <p className="mt-2 text-xs text-gray-500">{number}</p>
          </div>
          <div className="mb-7 flex items-center justify-center">
            {number !== "" && (
              <ActionButton
                className="mr-3 bg-sky-300 px-5 py-3 text-[13px] text-sky-800 transition-all duration-300 active:bg-sky-300/75 active:transition-none"
                onClick={() => {
                  setContactShown(false);
                  setTimeout(() => {
                    dispatch(setName(name));
                    dispatch(setImage(image));
                    dispatch(setColor(color));
                    dispatch(setPhoneNumber(number));
                  }, 500);
                }}
              >
                <HiPhone className="mr-2 text-base" />
                <p>Call</p>
              </ActionButton>
            )}
            <ActionButton
              className="bg-sky-300 px-5 py-3 text-[13px] text-sky-800 transition-all duration-300 active:bg-sky-300/75 active:transition-none"
              onClick={() => {
                setContactShown(false);
              }}
            >
              <IoChatbubbleEllipses className="mr-2 text-sm" />
              <p>Message</p>
            </ActionButton>
          </div>
          {name === "" && number !== emergencyNumber && (
            <div className="mb-4 rounded-md bg-gray-800/5 px-3 py-2 text-xs text-gray-800 dark:bg-gray-100/5 dark:text-gray-100">
              <p className="inline">This caller is not in your contact list.</p>
              <p
                className="ml-1 inline text-sky-600"
                onClick={() => {
                  setContactShown(false);
                  setTimeout(() => {
                    setAddCallerActive(true);
                    setAddCallerNumber(number);
                  }, 500);
                }}
              >
                Add this caller...
              </p>
            </div>
          )}
          <div className="mb-6 flex h-full flex-col text-sm">
            <p className="mb-2">Note</p>
            <textarea
              className="h-full resize-none appearance-none rounded-md border-none bg-gray-800/5 px-3 py-2 text-gray-800 outline-none dark:bg-gray-100/5 dark:text-gray-100"
              spellCheck={false}
            />
          </div>
        </div>
      </>
    );
  };

  const interactions = [
    {
      icon: <BiSolidMicrophoneOff />,
      label: "Mute",
    },
    {
      icon: <IoIosKeypad />,
      label: "Keypad",
    },
    {
      icon: <FaVolumeUp />,
      label: "Speaker",
    },
  ];

  useEffect(() => {
    if (phone.number !== "") {
      if (!callEnded) {
        const newHistory = [
          ...historyValue,
          {
            name: phone.name,
            number: phone.number,
            color: phone.color,
            image: phone.image,
          },
        ];

        history.value = newHistory;
        console.log(historyValue);
        sound.play();
        console.log("ok");
      } else {
        setTimeout(() => {
          dispatch(setName(""));
          dispatch(setImage(null));
          dispatch(setColor(null));
          setNumber([]);
          dispatch(setPhoneNumber(""));
          setCallEnded(false);
        }, 1500);
        return;
      }

      const timeout = setTimeout(() => setCallEnded(true), 52610);

      return () => clearTimeout(timeout);
    }
  }, [history, callEnded, phone, settings]);

  function generate(key: string) {
    switch (key) {
      case "1":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest opacity-0">
                -
              </p>
            </div>
          </Hammer>
        );
      case "2":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">ABC</p>
            </div>
          </Hammer>
        );
      case "3":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">DEF</p>
            </div>
          </Hammer>
        );
      case "4":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">GHI</p>
            </div>
          </Hammer>
        );
      case "5":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">JKL</p>
            </div>
          </Hammer>
        );
      case "6":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">MNO</p>
            </div>
          </Hammer>
        );
      case "7":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">PQRS</p>
            </div>
          </Hammer>
        );
      case "8":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">TUV</p>
            </div>
          </Hammer>
        );
      case "9":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">WXYZ</p>
            </div>
          </Hammer>
        );
      case "*":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
            </div>
          </Hammer>
        );
      case "0":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
              <p className="text-[9px] leading-4 tracking-widest">+</p>
            </div>
          </Hammer>
        );
      case "#":
        return (
          <Hammer
            onPress={() => setNumber([...number, key])}
            options={{
              recognizers: {
                press: {
                  time: 0,
                },
              },
            }}
          >
            <div className="flex h-16 w-full flex-col items-center justify-center rounded-full text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
              <p>{key}</p>
            </div>
          </Hammer>
        );
    }
  }

  return (
    <>
      <div
        className={twMerge(
          "pointer-events-none absolute bottom-0 left-0 right-0 top-0 m-auto h-[90%] w-[90%] bg-zinc-100 pt-8 opacity-0 transition-all duration-300 dark:bg-zinc-900",
          show && "pointer-events-auto h-full w-full opacity-100",
        )}
      >
        {section === 0 && (
          <>
            {favoriteValue.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center px-2">
                <div className="flex flex-col items-center text-gray-800/10 dark:text-gray-100/10">
                  <p>Favorite contacts will be displayed here.</p>
                </div>
              </div>
            ) : (
              <>
                {favoriteValue.map((i) => (
                  <Contact
                    name={i.name}
                    color={i.color}
                    image={i.image}
                    number={i.number}
                    key={Math.random()}
                  />
                ))}
              </>
            )}
          </>
        )}
        {section === 1 && (
          <>
            {historyValue.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center px-2">
                <div className="flex flex-col items-center text-gray-800/10 dark:text-gray-100/10">
                  <p>Recent calls will be displayed here.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col-reverse">
                {historyValue.map((i) => (
                  <Contact
                    name={i.name}
                    color={i.color}
                    image={i.image}
                    number={i.number}
                    key={Math.random()}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {section === 2 && (
          <>
            {contactValue.map((i) => (
              <Contact
                name={i.name}
                color={i.color}
                image={i.image}
                number={i.number}
              />
            ))}
            <div className="absolute bottom-24 flex w-full flex-row-reverse bg-gradient-to-t from-zinc-100 to-transparent p-6 dark:from-zinc-900">
              <ActionButton
                className="bg-sky-600 p-3 text-gray-100 transition-all duration-300 active:bg-sky-800 active:transition-none"
                onClick={() => setAddCallerActive(true)}
              >
                <AiOutlinePlus className="text-lg" />
              </ActionButton>
            </div>
          </>
        )}
        {section === 3 && (
          <div className="flex h-full flex-col-reverse pb-[135px] text-gray-800 dark:text-gray-100">
            <div className="flex flex-col">
              <Hammer
                onSwipeLeft={() => setNumber([])}
                onSwipeRight={() => setNumber([])}
              >
                <div className="mb-5 flex items-center justify-center">
                  {number.map((num) => (
                    <p className="text-2xl">{num}</p>
                  ))}
                </div>
              </Hammer>
              <div className="flex flex-col px-8">
                {keypad.map((i) => (
                  <div className="my-[2px] flex">
                    {i.map((key) => (
                      <>{generate(key)}</>
                    ))}
                  </div>
                ))}
                <div className="mt-5 flex items-center px-8">
                  <div className="relative flex w-full items-center">
                    <div className="flex w-full justify-center">
                      <ActionButton
                        className="bg-green-400 p-4 text-gray-100 transition-all duration-300 active:bg-green-500 active:transition-none"
                        onClick={() =>
                          setTimeout(
                            () => dispatch(setPhoneNumber(number.join(""))),
                            100,
                          )
                        }
                      >
                        <HiPhone className="text-xl" />
                      </ActionButton>
                    </div>
                    {number.length !== 0 && (
                      <Hammer onTap={() => setNumber(number.slice(0, -1))}>
                        <div className="absolute right-0 z-10 flex items-center justify-center rounded-full p-3 transition-all duration-200 active:bg-gray-800/10 active:transition-none dark:active:bg-gray-100/10">
                          <IoBackspaceOutline className="text-lg" />
                        </div>
                      </Hammer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          className={twMerge(
            "pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full justify-center bg-black/90 opacity-0 transition-all duration-[250ms]",
            addCallerActive && "pointer-events-auto opacity-100",
          )}
        >
          <div
            className={twMerge(
              "pointer-events-none absolute -bottom-full my-2 flex w-[97%] flex-col items-center rounded-3xl bg-gray-200 text-gray-800 opacity-0 transition-all duration-[600ms] dark:bg-zinc-950 dark:text-gray-100",
              addCallerActive && "pointer-events-auto bottom-0 opacity-100",
            )}
            style={{ height: `${height}px` }}
            ref={addCallerMenuRef}
          >
            <div className="relative flex w-full flex-col items-center px-6 py-8 pb-14">
              <div className="relative flex w-full flex-row-reverse items-center">
                <ActionButton
                  className="p-2 transition-all duration-500 active:bg-gray-800/10 active:transition-none dark:active:bg-gray-100/10"
                  onClick={() => {
                    setAddCallerActive(false);
                    setDefault();
                  }}
                >
                  <IoClose className="text-xl" />
                </ActionButton>
                <p
                  className={twMerge(
                    "pointer-events-none absolute flex w-full justify-center text-3xl font-semibold opacity-0 transition-all duration-[400ms]",
                    instructionShown && "opacity-100",
                  )}
                >
                  Add Contact
                </p>
                <div
                  className={twMerge(
                    "pointer-events-none absolute left-0 flex w-[85%] items-center opacity-0 transition-all duration-[400ms]",
                    processStarted && "opacity-100",
                  )}
                >
                  <div className="h-2 w-full overflow-hidden rounded-full bg-sky-600/10">
                    <div
                      className="h-full rounded-full bg-sky-600 transition-all duration-[400ms]"
                      style={{ width: `${index * 25}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="relative h-[360px] w-full">
                <div
                  className={twMerge(
                    "pointer-events-none absolute flex h-full w-full flex-col items-center justify-center text-center opacity-0 transition-all duration-[400ms]",
                    instructionShown && "pointer-events-auto opacity-100",
                  )}
                >
                  <div className="my-4 flex flex-col">
                    {settings.darkMode ? (
                      <img className="mb-4 w-full" src={ContactImgD} />
                    ) : (
                      <img className="my-8 h-full w-full" src={ContactImgL} />
                    )}
                    <p className="text-sm">
                      Adding contact will be very easy for you to identify who
                      they are.
                      <br />
                      Click the button to start the setup process.
                    </p>
                  </div>
                  <ActionButton
                    className="mt-6 bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                    onClick={() => {
                      setInstructionShow(false);
                      setTimeout(() => setProcessStart(true), 1400);
                    }}
                  >
                    <p>Get Started</p>
                  </ActionButton>
                </div>
                <div
                  className={twMerge(
                    "pointer-events-none absolute w-full opacity-0 transition-all duration-[400ms]",
                    processStarted && "pointer-events-auto opacity-100",
                  )}
                >
                  {index === 0 && (
                    <div className="flex h-[360px] w-full flex-col items-center justify-between py-6 text-center">
                      <div className="flex w-full flex-col items-center">
                        <p className="mb-8 text-3xl font-semibold">
                          What's their name?
                        </p>
                        <input
                          className="mx-10 w-full appearance-none rounded-xl border-none bg-gray-800/5 px-6 py-5 text-sm text-gray-800 outline-none placeholder:text-gray-800/10 dark:bg-gray-100/5 dark:text-gray-100 dark:placeholder:text-gray-100/10"
                          placeholder="Enter the name..."
                          value={nameValue}
                          spellCheck={false}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setNameValue(e.target.value)
                          }
                        />
                      </div>
                      <ActionButton
                        className={twMerge(
                          "bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none",
                          nameValue === "" &&
                            "pointer-events-none bg-gray-800/20 text-gray-800 opacity-20 dark:bg-gray-100/20 dark:text-gray-100",
                        )}
                        onClick={() => setIndex((prev) => prev + 1)}
                      >
                        <p>Next</p>
                      </ActionButton>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex h-[360px] w-full flex-col items-center justify-between py-6 text-center">
                      <div className="flex w-full flex-col items-center">
                        <p className="mb-8 text-3xl font-semibold">
                          What's their phone number?
                        </p>
                        <input
                          className="mx-10 w-full appearance-none rounded-xl border-none bg-gray-800/5 px-6 py-5 text-sm text-gray-800 outline-none placeholder:text-gray-800/10 dark:bg-gray-100/5 dark:text-gray-100 dark:placeholder:text-gray-100/10"
                          placeholder="Enter the phone number..."
                          value={addCallerNumber}
                          spellCheck={false}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAddCallerNumber(e.target.value)
                          }
                        />
                      </div>
                      <div className="relative flex w-full items-center">
                        <ActionButton
                          className="absolute left-0 p-2 transition-all duration-500 active:bg-gray-800/10 active:transition-none dark:active:bg-gray-100/10"
                          onClick={() => setIndex((prev) => prev - 1)}
                        >
                          <FiChevronLeft className="text-xl" />
                        </ActionButton>
                        <div className="flex w-full justify-center">
                          <ActionButton
                            className={twMerge(
                              "bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none",
                              addCallerNumber === "" &&
                                "pointer-events-none bg-gray-800/20 text-gray-800 opacity-20 dark:bg-gray-100/20 dark:text-gray-100",
                            )}
                            onClick={() => setIndex((prev) => prev + 1)}
                          >
                            <p>Next</p>
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex h-[360px] w-full flex-col items-center justify-between py-6 text-center">
                      <div className="flex h-full w-full flex-col items-center">
                        <p className="text-3xl font-semibold">
                          Would you like to add a profile picture?
                        </p>
                        <div className="flex h-full flex-col items-center justify-center">
                          {profilePicture ? (
                            <Avatar name="" image={profilePicture} size={100}>
                              <input
                                type="file"
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-full opacity-0"
                                onChange={addImage}
                              />
                            </Avatar>
                          ) : (
                            <Avatar
                              name=""
                              image={null}
                              color={null}
                              size={100}
                              fontSize={50}
                            >
                              <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center bg-white/80 p-5 text-gray-800 dark:bg-black/80 dark:text-gray-100">
                                <AiOutlinePlus className="text-4xl" />
                              </div>
                              <input
                                type="file"
                                accept=".png,jpg,.jpeg,.heic,.heif"
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-full opacity-0"
                                onChange={addImage}
                              />
                            </Avatar>
                          )}
                          {profilePicture && (
                            <p className="mt-4 text-xs">
                              You can change the profile picture by clicking on
                              the picture.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="relative flex w-full items-center">
                        <ActionButton
                          className="absolute left-0 p-2 transition-all duration-500 active:bg-gray-800/10 active:transition-none dark:active:bg-gray-100/10"
                          onClick={() => setIndex((prev) => prev - 1)}
                        >
                          <FiChevronLeft className="text-xl" />
                        </ActionButton>
                        <div className="flex w-full justify-center">
                          {profilePicture ? (
                            <ActionButton
                              className="bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                              onClick={() => setIndex((prev) => prev + 2)}
                            >
                              <p>Next</p>
                            </ActionButton>
                          ) : (
                            <ActionButton
                              className="bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                              onClick={() => {
                                setIndex((prev) => prev + 1);
                                setHeight(560);
                              }}
                            >
                              <p>No, thanks</p>
                            </ActionButton>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 3 && (
                    <div className="flex h-full w-full flex-col items-center justify-between py-6 text-center">
                      <div className="flex h-full w-full flex-col items-center">
                        <p className="text-3xl font-semibold">
                          Choose a perfect color for the avatar.
                        </p>
                        <div className="my-7 flex h-full flex-col items-center">
                          <Avatar
                            name={nameValue}
                            image={null}
                            color={colorValue}
                            size={90}
                            fontSize={45}
                          />
                          <div className="mt-4">
                            <div className="grid grid-cols-5">
                              {colorPalette.map((i) => (
                                <div
                                  className={`${
                                    i.color
                                  } m-2 overflow-hidden rounded-full p-4 ${
                                    i.active &&
                                    "outline outline-1 outline-offset-[3px] outline-gray-800 dark:outline-gray-100"
                                  }`}
                                  onClick={() => setColorValue(i.color)}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex w-full items-center">
                        <ActionButton
                          className="absolute left-0 p-2 transition-all duration-500 active:bg-gray-800/10 active:transition-none dark:active:bg-gray-100/10"
                          onClick={() => {
                            setIndex((prev) => prev - 1);
                            setHeight(451);
                          }}
                        >
                          <FiChevronLeft className="text-xl" />
                        </ActionButton>
                        <div className="flex w-full justify-center">
                          <ActionButton
                            className="bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                            onClick={() => {
                              setIndex((prev) => prev + 1);
                              setHeight(451);
                            }}
                          >
                            <p>Next</p>
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  )}
                  {index === 4 && (
                    <div className="flex h-[360px] w-full flex-col items-center justify-between py-6">
                      <div className="flex h-full w-full flex-col items-center">
                        <p className="text-center text-3xl font-semibold">
                          Overview
                        </p>
                        <p className="mt-3 text-center text-sm">
                          Does the profile below look satisfied to you?
                        </p>
                        <div className="my-4 flex h-full w-full items-center">
                          <div className="flex w-full items-center justify-between rounded-3xl bg-gray-100 px-6 py-4 text-gray-800 dark:bg-zinc-900 dark:text-gray-100">
                            <div className="flex items-center">
                              <Avatar
                                name={nameValue}
                                color={colorValue}
                                image={profilePicture}
                              />
                              <div className="ml-3 flex flex-col">
                                <p className="mb-1 font-bold">{nameValue}</p>
                                <p className="text-xs text-gray-500">
                                  {addCallerNumber}
                                </p>
                              </div>
                            </div>
                            <VscChevronRight className="text-xl text-gray-500" />
                          </div>
                        </div>
                      </div>
                      <div className="relative flex w-full items-center text-center">
                        <div className="flex w-full justify-center">
                          <ActionButton
                            className="bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                            onClick={() => setIndex(0)}
                          >
                            <p>No, it doesn't.</p>
                          </ActionButton>
                          <ActionButton
                            className="ml-2 bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                            onClick={() => {
                              const newContact = [
                                ...contactValue,
                                {
                                  name: nameValue,
                                  image: profilePicture,
                                  number: addCallerNumber,
                                  color: colorValue,
                                },
                              ];

                              setProcessStart(false);
                              setTimeout(() => {
                                contact.value = newContact;
                                setComplete(true);
                              }, 3400);
                            }}
                          >
                            <p>Yes, it does.</p>
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={twMerge(
                    "pointer-events-none absolute w-full text-center opacity-0 transition-all duration-[400ms]",
                    completed && "pointer-events-auto opacity-100",
                  )}
                >
                  <div className="flex h-[360px] w-full flex-col items-center justify-between py-6">
                    <div className="flex flex-col items-center">
                      <IoCheckmarkCircleOutline className="mb-4 text-7xl text-green-400" />
                      <p className="mb-2 text-3xl">You're all set.</p>
                      <p className="text-sm">
                        Process has been completed. You can now close this
                        dialog.
                      </p>
                    </div>
                    <ActionButton
                      className="bg-sky-700/20 px-7 py-3 font-semibold text-sky-700 transition-all duration-300 active:bg-sky-700/30 active:transition-none"
                      onClick={() => {
                        setAddCallerActive(false);
                        setDefault();
                      }}
                    >
                      <p>OK</p>
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-9 w-full pb-1 transition-all duration-500">
          <div className="mx-2 flex rounded-full bg-zinc-200/80 p-1 text-zinc-900 backdrop-blur-md transition-all duration-300 dark:bg-zinc-800/80 dark:text-zinc-100">
            <div
              className="flex w-full items-center justify-center rounded-full py-3 text-xl transition-all duration-300 active:bg-zinc-300/80 active:transition-none dark:active:bg-zinc-700/30"
              onClick={() => setSection(0)}
            >
              {section === 0 ? <TbStarFilled /> : <TbStar />}
            </div>
            <div
              className="flex w-full items-center justify-center rounded-full py-3 text-xl transition-all duration-300 active:bg-zinc-300/80 active:transition-none dark:active:bg-zinc-700/30"
              onClick={() => setSection(1)}
            >
              <TbHistory />
            </div>
            <div
              className="flex w-full items-center justify-center rounded-full py-3 text-xl transition-all duration-300 active:bg-zinc-300/80 active:transition-none dark:active:bg-zinc-700/30"
              onClick={() => setSection(2)}
            >
              {section === 2 ? <HiUser /> : <HiOutlineUser />}
            </div>
            <div
              className="flex w-full items-center justify-center rounded-full py-3 text-xl transition-all duration-300 active:bg-zinc-300/80 active:transition-none dark:active:bg-zinc-700/30"
              onClick={() => setSection(3)}
            >
              {section === 3 ? <IoKeypad /> : <IoKeypadOutline />}
            </div>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-10 m-auto flex h-[90%] w-[90%] flex-col opacity-0 transition-all duration-300",
          phone.number !== "" &&
            "pointer-events-auto h-full w-full opacity-100",
        )}
      >
        {phone.number === emergencyNumber ? (
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${EmergencyBg})` }}
          >
            <div className="flex h-full w-full flex-col bg-gradient-to-b from-[#680000]/80 to-[#a50000] px-4 py-8 text-gray-100">
              <div className="flex h-80 items-center justify-center">
                <div className="text-center">
                  <p className="mb-2 text-[42px] font-semibold">
                    {phone.name ? phone.name : phone.number}
                  </p>
                  {!callEnded ? (
                    <p className="text-sm">Calling Emergency Service...</p>
                  ) : (
                    <p className="text-sm">Call Ended</p>
                  )}
                </div>
              </div>
              <div className="flex h-full flex-col">
                <div className="flex h-full flex-col justify-center">
                  <div className="grid grid-cols-3 py-8">
                    {interactions.map((i) => (
                      <ActionButton
                        className={`mx-4 my-8 flex-col py-5 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${
                          callEnded && "pointer-events-none opacity-20"
                        }`}
                      >
                        {i.icon}
                        <p className="mt-3 text-xs">{i.label}</p>
                      </ActionButton>
                    ))}
                  </div>
                </div>
                <div className="my-10 flex justify-center">
                  <ActionButton
                    className={`bg-red-500 p-4 text-xl transition-all duration-200 active:bg-red-600 active:transition-none ${
                      callEnded &&
                      "pointer-events-none bg-gray-100/40 opacity-20"
                    }`}
                    onClick={() => {
                      setCallEnded(true);
                      sound.pause();
                    }}
                  >
                    <HiPhone className="rotate-[135deg] text-xl" />
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${
                phone.image ? phone.image : global.wallpaper
              })`,
            }}
          >
            <div className="flex h-full w-full flex-col bg-black/80 px-4 py-8 text-gray-100 backdrop-blur-md">
              <div className="flex h-80 items-center justify-center">
                <div className="text-center">
                  {phone.number !== "" && (
                    <>
                      <p className="mb-2 text-[42px] font-semibold">
                        {phone.name ? phone.name : phone.number}
                      </p>
                      {!callEnded ? (
                        <p className="text-sm">Calling...</p>
                      ) : (
                        <p className="text-sm">Call Ended</p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="flex h-full flex-col">
                <div className="flex h-full flex-col justify-center">
                  <div className="grid grid-cols-3 py-8">
                    {interactions.map((i) => (
                      <ActionButton
                        className={`mx-4 my-8 flex-col py-5 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${
                          callEnded && "pointer-events-none opacity-20"
                        }`}
                      >
                        {i.icon}
                        <p className="mt-3 text-xs">{i.label}</p>
                      </ActionButton>
                    ))}
                  </div>
                </div>
                <div className="my-10 flex justify-center">
                  <ActionButton
                    className={`bg-red-500 p-4 text-xl transition-all duration-200 active:bg-red-600 active:transition-none ${
                      callEnded &&
                      "pointer-events-none bg-gray-100/40 opacity-20"
                    }`}
                    onClick={() => {
                      setCallEnded(true);
                      sound.pause();
                    }}
                  >
                    <HiPhone className="rotate-[135deg] text-xl" />
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
