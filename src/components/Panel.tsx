import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AnyAction } from "@reduxjs/toolkit";
import { setLocked } from "@/store/reducers/global";
import { setPanelActive } from "@/store/reducers/panel";
import {
  setVolume,
  setNightShiftActive,
  setBoldText,
  setDarkMode,
  setWifi,
  setAirplaneMode,
  setBluetooth,
  setBrightness,
  toggleBatterySaver,
} from "@/store/reducers/settings";
import RangeSlider from "./RangeSlider";
import { twMerge } from "tailwind-merge";
import { FaVolumeUp } from "react-icons/fa";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { VscChevronUp } from "react-icons/vsc";
import { FiPower, FiSun, FiWifi, FiBluetooth } from "react-icons/fi";
import { HiOutlineSun } from "react-icons/hi";
import { IoAirplane } from "react-icons/io5";
import { TbLetterB } from "react-icons/tb";
import { BiLockAlt } from "react-icons/bi";
import { PiLeafBold } from "react-icons/pi";
import TimeObj from "./TimeObj";
import Hammer from "react-hammerjs";
import VolumeAdjustSound from "@/sounds/Oxygen-Sys-Special.mp3";
import BatteryIcon from "./BatteryIcon";
import BatteryLevel from "./BatteryLevel";
import ActionButton from "./ActionButton";
import {
  displayBatteryNotFoundMenu,
  displayPowerMenu,
  toggleEmergencyMode,
} from "@/store/reducers/modal";
import { IconType } from "react-icons";

export default function Panel() {
  const dispatch = useAppDispatch();
  const panelActive = useAppSelector((state) => state.panel.active);
  const settings = useAppSelector((state) => state.settings);
  const battery = useAppSelector((state) => state.settings.battery);

  function debounceAction(action: AnyAction, duration: number) {
    dispatch(setPanelActive(false));
    setTimeout(() => dispatch(action), duration);
  }

  interface PanelItemProps {
    icon: IconType;
    label: string;
    active: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }

  const PanelItem = ({
    icon: Icon,
    label,
    active,
    onClick,
  }: PanelItemProps) => {
    return (
      <div className="mx-2 mb-10 flex flex-col items-center text-center">
        <div
          className={twMerge(
            "mb-3 flex items-center justify-center rounded-full bg-gray-100 p-4 text-base transition-all hover:bg-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800",
            active &&
              "bg-[#83aaff] text-gray-800 hover:bg-[#aac5ff] dark:bg-[#83aaff] dark:text-gray-800 dark:hover:bg-[#aac5ff]",
          )}
          onClick={onClick}
        >
          <Icon />
        </div>
        <p>{label}</p>
      </div>
    );
  };

  const panelItems = [
    {
      icon: FiSun,
      label: "Night Shift",
      active: settings.nightShift.active,
      onClick: () => dispatch(setNightShiftActive(!settings.nightShift.active)),
    },
    {
      icon: FiWifi,
      label: settings.wifi ? "BreezeOS" : "Wi-Fi",
      active: settings.wifi,
      onClick: () => dispatch(setWifi(!settings.wifi)),
    },
    {
      icon: IoAirplane,
      label: "Airplane Mode",
      active: settings.airplaneMode,
      onClick: () => dispatch(setAirplaneMode(!settings.airplaneMode)),
    },
    {
      icon: FaCircleHalfStroke,
      label: "Dark Mode",
      active: settings.darkMode,
      onClick: () => dispatch(setDarkMode(!settings.darkMode)),
    },
    {
      icon: FiBluetooth,
      label: "Bluetooth",
      active: settings.bluetooth,
      onClick: () => dispatch(setBluetooth(!settings.bluetooth)),
    },
    {
      icon: TbLetterB,
      label: "Bold Text",
      active: settings.boldText,
      onClick: () => dispatch(setBoldText(!settings.boldText)),
    },
    {
      icon: PiLeafBold,
      label: "Battery Saver",
      active: battery.batterySaver,
      onClick: () => {
        if (battery.level === "-") {
          dispatch(toggleBatterySaver(false));
          dispatch(displayBatteryNotFoundMenu(true));
        } else {
          dispatch(toggleBatterySaver(!battery.batterySaver));
        }
      },
    },
  ];

  return (
    <>
      <div
        className={twMerge(
          "pointer-events-none absolute bottom-full z-30 flex h-full w-full flex-col justify-between bg-white/95 px-6 py-4 pb-0 text-sm text-gray-800 opacity-0 backdrop-blur-sm transition-all duration-200 dark:bg-gray-950/90 dark:text-gray-50",
          panelActive && "pointer-events-auto bottom-0 opacity-100",
        )}
      >
        <div className="relative h-full">
          <div className="flex flex-col">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <BatteryIcon className="mr-1 text-sm" />
                <BatteryLevel />
                <div className="mx-2 h-4 w-[0.5px] bg-gray-900 dark:bg-gray-100"></div>
                <TimeObj />
              </div>
              <div className="flex items-center">
                <ActionButton
                  className="mr-1 p-2 active:bg-gray-900/10 dark:active:bg-gray-100/10"
                  onClick={() => debounceAction(setLocked(true), 300)}
                >
                  <BiLockAlt className="text-base" />
                </ActionButton>
                <Hammer
                  onTap={() => debounceAction(displayPowerMenu(true), 300)}
                  onPress={() => {
                    dispatch(toggleEmergencyMode(true));
                    debounceAction(displayPowerMenu(true), 300);
                  }}
                  options={{
                    recognizers: {
                      press: {
                        time: 1000,
                      },
                    },
                  }}
                >
                  <div className="flex items-center justify-center rounded-full p-2 transition duration-75 active:bg-gray-900/10 dark:active:bg-gray-100/10">
                    <FiPower className="text-base" />
                  </div>
                </Hammer>
              </div>
            </div>
            <div className="flex flex-col border-b border-solid border-b-gray-200 py-8 dark:border-b-gray-900">
              <div className="mb-8 flex items-center">
                <FaVolumeUp className="mr-4 text-lg" />
                <RangeSlider
                  value={settings.volume}
                  min={0}
                  max={100}
                  onClick={() => new Audio(VolumeAdjustSound).play()}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setVolume(e.target.value))
                  }
                />
              </div>
              <div className="flex items-center">
                <HiOutlineSun className="mr-4 text-lg" />
                <RangeSlider
                  value={settings.brightness}
                  min={15}
                  max={100}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setBrightness(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-3 py-8">
              {panelItems.map((i) => (
                <PanelItem key={Math.random()} {...i} />
              ))}
            </div>
          </div>
          <Hammer
            onSwipeUp={() => dispatch(setPanelActive(false))}
            direction="DIRECTION_UP"
          >
            <div className="absolute bottom-0 mb-3 flex w-full justify-center px-6 text-2xl">
              <ActionButton
                className="p-1 active:bg-gray-900/10 dark:active:bg-gray-100/10"
                onClick={() => dispatch(setPanelActive(false))}
              >
                <VscChevronUp />
              </ActionButton>
            </div>
          </Hammer>
        </div>
      </div>
    </>
  );
}
