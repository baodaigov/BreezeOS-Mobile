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
} from "react-icons/io5";
import ActionButton from "../../components/ActionButton";
import Sound from "../../sounds/call.mp3";
import { BsStar, BsStarFill } from "react-icons/bs";
import { RiContactsLine, RiHistoryLine } from "react-icons/ri";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { HiPhone } from "react-icons/hi";
import {
  AiOutlineExclamation,
  AiOutlinePlus,
  AiOutlineUser,
} from "react-icons/ai";
import { IconType } from "react-icons";
import { signal } from "@preact/signals";
import Hammer from "react-hammerjs";
import ContactImgD from "../../images/contact-d.svg";
import ContactImgL from "../../images/contact-l.svg";
import { FiChevronLeft } from "react-icons/fi";
import { Contact } from "../../../types";

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
  const [section, setSection] = useState<number>(0);
  const emergencyNumber = "911";
  const historyValue = history.value;
  const favoriteValue = favorite.value;
  const contactValue = contact.value;
  const sound = new Audio(Sound);
  const [callEnded, setCallEnded] = useState<boolean>(false);

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
            className="relative overflow-hidden rounded-full flex justify-center items-center bg-red-500 text-gray-800"
            style={{ width: size, height: size, fontSize: fontSize }}
          >
            <AiOutlineExclamation />
          </div>
        ) : (
          <div
            className={`relative overflow-hidden rounded-full flex justify-center items-center text-gray-100 ${
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
                  <AiOutlineUser className="w-full h-full bg-sky-600 text-gray-800" />
                )}
              </>
            ) : (
              <img className="w-full h-full" src={image} />
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
            className="flex justify-between items-center w-full rounded-full p-4 text-gray-800 dark:text-gray-100 transition-all duration-300 active:bg-gray-800/10 dark:active:bg-gray-100/5 active:transition-none"
            onClick={() => setContactShown(true)}
          >
            <div className="flex items-center">
              <Avatar
                name={name}
                image={image}
                color={color}
                isEmergency={number === emergencyNumber && true}
              />
              <div className="flex flex-col ml-3">
                <p className="font-bold mb-1">
                  {number === emergencyNumber
                    ? "Emergency service"
                    : name !== ""
                    ? name
                    : `${number}`}
                </p>
                <p className="text-xs text-gray-500">{number && number}</p>
              </div>
            </div>
            <VscChevronRight className="text-gray-500 text-xl" />
          </div>
        </div>
        <div
          className={twMerge(
            "absolute z-10 top-0 bottom-0 right-0 left-0 m-auto w-[90%] h-[90%] flex flex-col py-8 px-4 bg-zinc-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 transition-all duration-300 opacity-0 pointer-events-none",
            contactShown && "w-full h-full opacity-100 pointer-events-auto"
          )}
        >
          <div className="flex justify-between mb-4">
            <ActionButton
              className="p-2 transition-all duration-200 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none"
              onClick={() => setContactShown(false)}
            >
              <VscChevronLeft className="text-xl" />
            </ActionButton>
            <ActionButton
              className="p-2 transition-all duration-200 text-sky-600 active:bg-sky-600/10 active:transition-none"
              onClick={() => setFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <BsStarFill className="text-lg" />
              ) : (
                <BsStar className="text-lg" />
              )}
            </ActionButton>
          </div>
          <div className="flex flex-col items-center my-5">
            <Avatar
              name={name}
              image={image}
              color={color}
              size={96}
              fontSize={48}
              isEmergency={number === emergencyNumber && true}
            >
              {name !== "" && number !== "" && (
                <div className="bg-black/70 text-gray-100 w-full h-full absolute top-0 left-0 bottom-0 right-0 p-5 flex justify-center items-center opacity-0 hover:opacity-100">
                  <BiPencil className="text-3xl" />
                </div>
              )}
            </Avatar>
            <p className="text-xl mt-5">
              {number === emergencyNumber
                ? "Emergency service"
                : name !== ""
                ? name
                : `${number}`}
            </p>
            <p className="text-xs text-gray-500 mt-2">{number}</p>
          </div>
          <div className="flex justify-center items-center mb-7">
            {number !== "" && (
              <ActionButton
                className="text-[13px] bg-sky-300 text-sky-800 transition-all duration-300 active:bg-sky-300/75 active:transition-none py-3 px-5 mr-3"
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
                <HiPhone className="text-base mr-2" />
                <p>Call</p>
              </ActionButton>
            )}
            <ActionButton
              className="text-[13px] bg-sky-300 text-sky-800 transition-all duration-300 active:bg-sky-300/75 active:transition-none py-3 px-5"
              onClick={() => {
                setContactShown(false);
              }}
            >
              <IoChatbubbleEllipses className="text-sm mr-2" />
              <p>Message</p>
            </ActionButton>
          </div>
          {name === "" && number !== emergencyNumber && (
            <div className="rounded-md py-2 px-3 mb-4 text-xs bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100">
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
          <div className="flex flex-col text-sm h-full mb-6">
            <p className="mb-2">Note</p>
            <textarea
              className="appearance-none resize-none border-none outline-none rounded-md py-2 px-3 h-full bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100"
              spellCheck={false}
            />
          </div>
        </div>
      </>
    );
  };

  const AddCaller = () => {
    const [active, setActive] = useState<boolean>(false);
    const [height, setHeight] = useState(451);
    const [instructionShown, setInstructionShow] = useState<boolean>(true);
    const [processStarted, setProcessStart] = useState<boolean>(false);
    const [completed, setComplete] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [nameValue, setNameValue] = useState<string>("");
    const [numberValue, setNumberValue] = useState<string>(addCallerNumber);
    const [profilePicture, setProfilePicture] = useState<any>(null);
    const [colorValue, setColorValue] = useState<string>("bg-red-500");

    useEffect(() => {
      if (addCallerActive) {
        setActive(true);
      } else {
        setActive(false);
      }
    }, [addCallerActive]);

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

    return (
      <div
        className={twMerge(
          "absolute top-0 bottom-0 left-0 right-0 bg-black/90 z-10 w-full h-full flex justify-center opacity-0 pointer-events-none transition-all duration-[250ms]",
          active && "opacity-100 pointer-events-auto"
        )}
      >
        <div
          className={twMerge(
            "absolute -bottom-full w-[97%] rounded-3xl my-2 flex flex-col items-center bg-gray-200 text-gray-800 dark:bg-zinc-950 dark:text-gray-100 transition-all duration-[600ms] opacity-0 pointer-events-none",
            active && "bottom-0 opacity-100 pointer-events-auto"
          )}
          style={{ height: `${height}px` }}
          ref={addCallerMenuRef}
        >
          <div className="relative w-full py-8 px-6 pb-14 flex flex-col items-center">
            <div className="relative w-full flex flex-row-reverse items-center">
              <ActionButton
                className="p-2 transition-all duration-500 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none"
                onClick={() => {
                  setAddCallerActive(false);
                  setDefault();
                }}
              >
                <IoClose className="text-xl" />
              </ActionButton>
              <p
                className={twMerge(
                  "absolute pointer-events-none font-semibold text-3xl w-full flex justify-center opacity-0 transition-all duration-[400ms]",
                  instructionShown && "opacity-100"
                )}
              >
                Add Contact
              </p>
              <div
                className={twMerge(
                  "w-[85%] absolute left-0 flex items-center pointer-events-none opacity-0 transition-all duration-[400ms]",
                  processStarted && "opacity-100"
                )}
              >
                <div className="w-full h-2 bg-sky-600/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 rounded-full transition-all duration-[400ms]"
                    style={{ width: `${index * 25}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[360px]">
              <div
                className={twMerge(
                  "absolute w-full h-full flex flex-col items-center justify-center text-center opacity-0 pointer-events-none transition-all duration-[400ms]",
                  instructionShown && "opacity-100 pointer-events-auto"
                )}
              >
                <div className="flex flex-col my-4">
                  {settings.darkMode ? (
                    <img className="w-full mb-4" src={ContactImgD} />
                  ) : (
                    <img className="w-full h-full my-8" src={ContactImgL} />
                  )}
                  <p className="text-sm">
                    Adding contact will be very easy for you to identify who
                    they are.
                    <br />
                    Click the button to start the setup process.
                  </p>
                </div>
                <ActionButton
                  className="bg-sky-700/20 text-sky-700 mt-6 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
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
                  "absolute w-full opacity-0 pointer-events-none transition-all duration-[400ms]",
                  processStarted && "opacity-100 pointer-events-auto"
                )}
              >
                {index === 0 && (
                  <div className="w-full text-center h-[360px] flex flex-col justify-between items-center py-6">
                    <div className="flex flex-col items-center w-full">
                      <p className="text-3xl font-semibold mb-8">
                        What's their name?
                      </p>
                      <input
                        className="w-full appearance-none border-none outline-none rounded-xl bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100 placeholder:text-gray-800/10 dark:placeholder:text-gray-100/10 px-6 py-5 mx-10 text-sm"
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
                        "bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold",
                        nameValue === "" &&
                          "bg-gray-800/20 text-gray-800 dark:bg-gray-100/20 dark:text-gray-100 opacity-20 pointer-events-none"
                      )}
                      onClick={() => setIndex((prev) => prev + 1)}
                    >
                      <p>Next</p>
                    </ActionButton>
                  </div>
                )}
                {index === 1 && (
                  <div className="w-full text-center h-[360px] flex flex-col justify-between items-center py-6">
                    <div className="flex flex-col items-center w-full">
                      <p className="text-3xl font-semibold mb-8">
                        What's their phone number?
                      </p>
                      <input
                        className="w-full appearance-none border-none outline-none rounded-xl bg-gray-800/5 text-gray-800 dark:bg-gray-100/5 dark:text-gray-100 placeholder:text-gray-800/10 dark:placeholder:text-gray-100/10 px-6 py-5 mx-10 text-sm"
                        placeholder="Enter the phone number..."
                        value={numberValue}
                        spellCheck={false}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNumberValue(e.target.value)
                        }
                      />
                    </div>
                    <div className="relative w-full flex items-center">
                      <ActionButton
                        className="absolute left-0 p-2 transition-all duration-500 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none"
                        onClick={() => setIndex((prev) => prev - 1)}
                      >
                        <FiChevronLeft className="text-xl" />
                      </ActionButton>
                      <div className="w-full flex justify-center">
                        <ActionButton
                          className={twMerge(
                            "bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold",
                            numberValue === "" &&
                              "bg-gray-800/20 text-gray-800 dark:bg-gray-100/20 dark:text-gray-100 opacity-20 pointer-events-none"
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
                  <div className="w-full text-center h-[360px] flex flex-col justify-between items-center py-6">
                    <div className="flex flex-col items-center w-full h-full">
                      <p className="text-3xl font-semibold">
                        Would you like to add a profile picture?
                      </p>
                      <div className="h-full flex flex-col justify-center items-center">
                        {profilePicture ? (
                          <Avatar name="" image={profilePicture} size={100}>
                            <input
                              type="file"
                              className="rounded-full absolute top-0 left-0 bottom-0 right-0 w-full h-full opacity-0"
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
                            <div className="bg-white/80 text-gray-800 dark:bg-black/80 dark:text-gray-100 w-full h-full absolute top-0 left-0 bottom-0 right-0 p-5 flex justify-center items-center">
                              <AiOutlinePlus className="text-4xl" />
                            </div>
                            <input
                              type="file"
                              accept=".png,jpg,.jpeg,.heic,.heif"
                              className="rounded-full absolute top-0 left-0 bottom-0 right-0 w-full h-full opacity-0"
                              onChange={addImage}
                            />
                          </Avatar>
                        )}
                        {profilePicture && (
                          <p className="text-xs mt-4">
                            You can change the profile picture by clicking on
                            the picture.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="relative w-full flex items-center">
                      <ActionButton
                        className="absolute left-0 p-2 transition-all duration-500 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none"
                        onClick={() => setIndex((prev) => prev - 1)}
                      >
                        <FiChevronLeft className="text-xl" />
                      </ActionButton>
                      <div className="w-full flex justify-center">
                        {profilePicture ? (
                          <ActionButton
                            className="bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
                            onClick={() => setIndex((prev) => prev + 2)}
                          >
                            <p>Next</p>
                          </ActionButton>
                        ) : (
                          <ActionButton
                            className="bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
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
                  <div className="w-full text-center h-full flex flex-col justify-between items-center py-6">
                    <div className="flex flex-col items-center w-full h-full">
                      <p className="text-3xl font-semibold">
                        Choose a perfect color for the avatar.
                      </p>
                      <div className="h-full flex flex-col items-center my-7">
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
                                } rounded-full overflow-hidden p-4 m-2 ${
                                  i.active &&
                                  "outline outline-1 outline-gray-800 dark:outline-gray-100 outline-offset-[3px]"
                                }`}
                                onClick={() => setColorValue(i.color)}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full flex items-center">
                      <ActionButton
                        className="absolute left-0 p-2 transition-all duration-500 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none"
                        onClick={() => {
                          setIndex((prev) => prev - 1);
                          setHeight(451);
                        }}
                      >
                        <FiChevronLeft className="text-xl" />
                      </ActionButton>
                      <div className="w-full flex justify-center">
                        <ActionButton
                          className="bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
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
                  <div className="w-full h-[360px] flex flex-col justify-between items-center py-6">
                    <div className="flex flex-col items-center w-full h-full">
                      <p className="text-3xl font-semibold text-center">
                        Overview
                      </p>
                      <p className="text-sm mt-3 text-center">
                        Does the profile below look satisfied to you?
                      </p>
                      <div className="h-full w-full flex items-center my-4">
                        <div className="rounded-3xl w-full bg-gray-100 text-gray-800 dark:bg-zinc-900 dark:text-gray-100 py-4 px-6 flex justify-between items-center">
                          <div className="flex items-center">
                            <Avatar
                              name={nameValue}
                              color={colorValue}
                              image={profilePicture}
                            />
                            <div className="flex flex-col ml-3">
                              <p className="font-bold mb-1">{nameValue}</p>
                              <p className="text-xs text-gray-500">
                                {numberValue}
                              </p>
                            </div>
                          </div>
                          <VscChevronRight className="text-gray-500 text-xl" />
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full flex items-center text-center">
                      <div className="w-full flex justify-center">
                        <ActionButton
                          className="bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
                          onClick={() => setIndex(0)}
                        >
                          <p>No, it doesn't.</p>
                        </ActionButton>
                        <ActionButton
                          className="ml-2 bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
                          onClick={() => {
                            const newContact = [
                              ...contactValue,
                              {
                                name: nameValue,
                                image: profilePicture,
                                number: numberValue,
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
                  "absolute w-full opacity-0 pointer-events-none transition-all duration-[400ms] text-center",
                  completed && "opacity-100 pointer-events-auto"
                )}
              >
                <div className="w-full h-[360px] flex flex-col justify-between items-center py-6">
                  <div className="flex flex-col items-center">
                    <IoCheckmarkCircleOutline className="text-7xl text-green-400 mb-4" />
                    <p className="text-3xl mb-2">You're all set.</p>
                    <p className="text-sm">
                      Process has been completed. You can now close this dialog.
                    </p>
                  </div>
                  <ActionButton
                    className="bg-sky-700/20 text-sky-700 py-3 px-7 transition-all duration-300 active:bg-sky-700/30 active:transition-none font-semibold"
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
    );
  };

  interface NavBarProps {
    sections: {
      active?: boolean;
      includeValue?: boolean;
      icon: IconType;
      value?: string;
      action: React.MouseEventHandler<HTMLButtonElement>;
    }[];
  }

  const NavBar: React.FC<NavBarProps> = ({ sections }) => {
    return (
      <div className="absolute bottom-0 w-full p-2 pb-10 flex justify-between bg-sky-600 bg-opacity-10">
        {sections.map((i) => (
          <ActionButton
            className={`w-full rounded-full transition-all duration-300 active:bg-sky-600/10 active:transition-none ${
              i.active ? "text-sky-600" : "text-gray-800 dark:text-gray-300"
            }`}
            onMouseDown={i.action}
          >
            <div
              className={`w-[75%] py-3 flex flex-col justify-center items-center ${
                i.active && "border-b-2 border-solid border-sky-600"
              }`}
            >
              <i.icon className="text-lg mb-1" />
              {i.includeValue && <p className="text-xs">{i.value}</p>}
            </div>
          </ActionButton>
        ))}
      </div>
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
            <div className="flex flex-col justify-center items-center rounded-full w-full h-16 text-2xl transition-all duration-300 active:bg-sky-600/10 active:transition-none">
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
          "absolute bg-zinc-100 dark:bg-zinc-900 top-0 bottom-0 left-0 right-0 pt-8 m-auto w-[90%] h-[90%] transition-all duration-300 opacity-0 pointer-events-none",
          show && "w-full h-full opacity-100 pointer-events-auto"
        )}
      >
        {section === 0 && (
          <>
            {favoriteValue.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center px-2">
                <div className="flex flex-col items-center text-gray-800/10 dark:text-gray-100/10">
                  <BsStarFill className="text-6xl mb-4" />
                  <p className="text-sm">
                    Favorite contacts will be displayed here.
                  </p>
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
              <div className="w-full h-full flex justify-center items-center px-2">
                <div className="flex flex-col items-center text-gray-800/10 dark:text-gray-100/10">
                  <RiHistoryLine className="text-6xl mb-4" />
                  <p className="text-sm">
                    Recent calls will be displayed here.
                  </p>
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
            <div className="absolute bottom-24 w-full flex flex-row-reverse bg-gradient-to-t from-zinc-100 dark:from-zinc-900 to-transparent p-6">
              <ActionButton
                className="p-3 text-gray-100 bg-sky-600 transition-all duration-300 active:bg-sky-800 active:transition-none"
                onClick={() => setAddCallerActive(true)}
              >
                <AiOutlinePlus className="text-lg" />
              </ActionButton>
            </div>
          </>
        )}
        {section === 3 && (
          <div className="h-full flex flex-col-reverse pb-[135px] text-gray-800 dark:text-gray-100">
            <div className="flex flex-col">
              <Hammer
                onSwipeLeft={() => setNumber([])}
                onSwipeRight={() => setNumber([])}
              >
                <div className="flex justify-center items-center mb-5">
                  {number.map((num) => (
                    <p className="text-2xl">{num}</p>
                  ))}
                </div>
              </Hammer>
              <div className="flex flex-col px-8">
                {keypad.map((i) => (
                  <div className="flex my-[2px]">
                    {i.map((key) => (
                      <>{generate(key)}</>
                    ))}
                  </div>
                ))}
                <div className="flex items-center mt-5 px-8">
                  <div className="relative w-full flex items-center">
                    <div className="w-full flex justify-center">
                      <ActionButton
                        className="p-4 bg-green-400 text-gray-100 transition-all duration-300 active:bg-green-500 active:transition-none"
                        onClick={() =>
                          setTimeout(
                            () => dispatch(setPhoneNumber(number.join(""))),
                            100
                          )
                        }
                      >
                        <HiPhone className="text-xl" />
                      </ActionButton>
                    </div>
                    {number.length !== 0 && (
                      <Hammer
                        onTap={() => setNumber(number.slice(0, -1))}
                      >
                        <div className="absolute right-0 flex justify-center items-center rounded-full z-10 p-3 transition-all duration-200 active:bg-gray-800/10 dark:active:bg-gray-100/10 active:transition-none">
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
        <AddCaller />
        <NavBar
          sections={[
            {
              active: section === 0,
              icon: BsStarFill,
              action: () => setSection(0),
            },
            {
              active: section === 1,
              icon: RiHistoryLine,
              action: () => setSection(1),
            },
            {
              active: section === 2,
              icon: RiContactsLine,
              action: () => setSection(2),
            },
            {
              active: section === 3,
              icon: IoIosKeypad,
              action: () => {
                setSection(3);
              },
            },
          ]}
        />
      </div>
      <div
        className={twMerge(
          "absolute top-0 bottom-0 left-0 right-0 z-10 m-auto w-[90%] h-[90%] flex flex-col transition-all duration-300 opacity-0 pointer-events-none",
          phone.number !== "" && "w-full h-full opacity-100 pointer-events-auto"
        )}
      >
        {phone.number === emergencyNumber ? (
          <div
            className="bg-center bg-no-repeat bg-cover w-full h-full"
            style={{ backgroundImage: `url(${EmergencyBg})` }}
          >
            <div className="flex flex-col bg-gradient-to-b from-[#680000]/80 to-[#a50000] w-full h-full py-8 px-4 text-gray-100">
              <div className="flex justify-center items-center h-80">
                <div className="text-center">
                  <p className="text-[42px] font-semibold mb-2">
                    {phone.name ? phone.name : phone.number}
                  </p>
                  {!callEnded ? (
                    <p className="text-sm">Calling Emergency Service...</p>
                  ) : (
                    <p className="text-sm">Call Ended</p>
                  )}
                </div>
              </div>
              <div className="h-full flex flex-col">
                <div className="flex flex-col justify-center h-full">
                  <div className="grid grid-cols-3 py-8">
                    {interactions.map((i) => (
                      <ActionButton
                        className={`flex-col py-5 mx-4 my-8 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${
                          callEnded && "opacity-20 pointer-events-none"
                        }`}
                      >
                        {i.icon}
                        <p className="text-xs mt-3">{i.label}</p>
                      </ActionButton>
                    ))}
                  </div>
                </div>
                <div className="my-10 flex justify-center">
                  <ActionButton
                    className={`bg-red-500 transition-all duration-200 active:bg-red-600 active:transition-none p-4 text-xl ${
                      callEnded &&
                      "bg-gray-100/40 opacity-20 pointer-events-none"
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
            className="bg-center bg-no-repeat bg-cover w-full h-full"
            style={{
              backgroundImage: `url(${
                phone.image ? phone.image : global.wallpaper
              })`,
            }}
          >
            <div className="flex flex-col bg-black/80 backdrop-blur-md w-full h-full py-8 px-4 text-gray-100">
              <div className="flex justify-center items-center h-80">
                <div className="text-center">
                  {phone.number !== "" && (
                    <>
                      <p className="text-[42px] font-semibold mb-2">
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
              <div className="h-full flex flex-col">
                <div className="flex flex-col justify-center h-full">
                  <div className="grid grid-cols-3 py-8">
                    {interactions.map((i) => (
                      <ActionButton
                        className={`flex-col py-5 mx-4 my-8 text-2xl transition-all duration-200 active:bg-gray-100/10 active:transition-none ${
                          callEnded && "opacity-20 pointer-events-none"
                        }`}
                      >
                        {i.icon}
                        <p className="text-xs mt-3">{i.label}</p>
                      </ActionButton>
                    ))}
                  </div>
                </div>
                <div className="my-10 flex justify-center">
                  <ActionButton
                    className={`bg-red-500 transition-all duration-200 active:bg-red-600 active:transition-none p-4 text-xl ${
                      callEnded &&
                      "bg-gray-100/40 opacity-20 pointer-events-none"
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
