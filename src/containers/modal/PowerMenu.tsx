import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { displayPowerMenu, toggleEmergencyMode } from "@/store/reducers/modal";
import ModalBg from "@/components/ModalBg";
import ActionButton from "@/components/ActionButton";
import { FiPower } from "react-icons/fi";
import { GrRotateLeft } from "react-icons/gr";
import { BiLockAlt } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { TbSos } from "react-icons/tb";
import {
  setBlank,
  setDefault,
  setLocked,
  displayScreenSplash,
  setHome,
} from "@/store/reducers/global";
import { twMerge } from "tailwind-merge";
import { setHeaderActive } from "@/store/reducers/header";
import { setFooterActive } from "@/store/reducers/footer";
import { setPhoneNumber } from "@/store/reducers/apps/phone";

export default function PowerMenu() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.powermenu);
  const [modalType, setModalType] = useState<string>("");

  useEffect(() => {
    if (modal.active) {
      setModalType("default");
    } else {
      setModalType("");
    }
  }, [modal]);

  function debounceAction(action: () => void, duration: number) {
    dispatch(displayPowerMenu(false));
    setTimeout(action, duration);
  }

  function switchModal(type: string) {
    setModalType("");
    setTimeout(() => {
      setModalType(type);
    }, 120);
  }

  function powerOff() {
    dispatch(setHeaderActive(false));
    dispatch(setFooterActive(false));
    dispatch(setHome());
    setTimeout(() => {
      dispatch(displayScreenSplash(true));
    }, 1000);
    setTimeout(() => {
      dispatch(setBlank(true));
      dispatch(setDefault());
    }, 11000);
  }

  function restart() {
    powerOff();
    setTimeout(() => {
      dispatch(setBlank(false));
      dispatch(displayScreenSplash(true));
    }, 17000);
    setTimeout(() => {
      dispatch(displayScreenSplash(false));
      dispatch(setHeaderActive(true));
      dispatch(setFooterActive(true));
    }, 43000);
  }

  return (
    <ModalBg active={modal.active}>
      <div
        className={twMerge(
          "pointer-events-none absolute flex flex-col text-sm opacity-0 transition-all duration-200",
          modalType === "default" && "pointer-events-auto opacity-100",
        )}
      >
        <p className="mb-10">Choose an option:</p>
        <div className="flex flex-col justify-center">
          {!modal.emergencyMode && (
            <div className="mb-7 flex flex-col items-center justify-center">
              <ActionButton
                className="mb-4 bg-gray-100/10 p-4 backdrop-blur-md transition-all active:bg-gray-100/20"
                onClick={() =>
                  debounceAction(() => dispatch(setLocked(true)), 300)
                }
              >
                <BiLockAlt className="text-base" />
              </ActionButton>
              <p className="text-sm">Lock</p>
            </div>
          )}
          <div className="mb-7 flex flex-col items-center justify-center">
            <ActionButton
              className="mb-4 bg-gray-100/10 p-4 backdrop-blur-md transition-all active:bg-gray-100/20"
              onClick={() => switchModal("poweroff")}
            >
              <FiPower className="text-base" />
            </ActionButton>
            <p className="text-sm">Power Off</p>
          </div>
          <div className="mb-7 flex flex-col items-center justify-center">
            <ActionButton
              className="mb-4 bg-gray-100/10 p-4 backdrop-blur-md transition-all active:bg-gray-100/20"
              onClick={() => switchModal("restart")}
            >
              <GrRotateLeft className="text-base" />
            </ActionButton>
            <p className="text-sm">Restart</p>
          </div>
          {modal.emergencyMode && (
            <div className="mb-7 flex flex-col items-center justify-center">
              <ActionButton
                className="mb-4 bg-red-400/10 p-3 text-red-400 backdrop-blur-md transition-all active:bg-red-400/20"
                onClick={() => {
                  dispatch(displayPowerMenu(false));
                  debounceAction(() => {
                    dispatch(toggleEmergencyMode(false));
                    dispatch(setPhoneNumber("911"));
                  }, 500);
                }}
              >
                <TbSos className="text-2xl" />
              </ActionButton>
              <p className="text-sm">Emergency SOS</p>
            </div>
          )}
          <div className="mt-14 flex items-center justify-center">
            <ActionButton
              className="bg-gray-100/10 p-4 transition-all active:bg-gray-100/20"
              onClick={() => {
                dispatch(displayPowerMenu(false));
                dispatch(toggleEmergencyMode(false));
              }}
            >
              <IoCloseOutline className="text-lg" />
            </ActionButton>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "pointer-events-none absolute flex flex-col items-center px-12 opacity-0 transition-all duration-200",
          modalType === "poweroff" && "pointer-events-auto opacity-100",
        )}
      >
        <ActionButton
          className="mb-8 bg-gray-100/10 p-5 backdrop-blur-md transition-all active:bg-gray-100/20"
          onClick={() => debounceAction(powerOff, 500)}
        >
          <FiPower className="text-xl" />
        </ActionButton>
        <p className="mb-6 text-3xl font-bold">Power off?</p>
        <p className="text-sm">
          Click the button above to power off this system.
        </p>
        <ActionButton
          className="mt-20 bg-gray-100/10 px-6 py-4 backdrop-blur-md active:bg-gray-100/20"
          onClick={() => switchModal("default")}
        >
          <IoCloseOutline className="mr-1 text-lg" />
          <p className="text-sm">Cancel</p>
        </ActionButton>
      </div>
      <div
        className={twMerge(
          "pointer-events-none absolute flex flex-col items-center px-12 opacity-0 transition-all duration-200",
          modalType === "restart" && "pointer-events-auto opacity-100",
        )}
      >
        <ActionButton
          className="mb-8 bg-gray-100/10 p-5 backdrop-blur-md transition-all active:bg-gray-100/20"
          onClick={() => debounceAction(restart, 500)}
        >
          <GrRotateLeft className="text-xl" />
        </ActionButton>
        <p className="mb-6 text-3xl font-bold">Restart?</p>
        <p className="text-sm">
          Click the button above to restart this system.
        </p>
        <ActionButton
          className="mt-20 bg-gray-100/10 px-6 py-4 backdrop-blur-md active:bg-gray-100/20"
          onClick={() => switchModal("default")}
        >
          <IoCloseOutline className="mr-1 text-xl" />
          <p className="text-sm">Cancel</p>
        </ActionButton>
      </div>
    </ModalBg>
  );
}
