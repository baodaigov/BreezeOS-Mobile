import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPanelActive } from "@/store/reducers/panel";
import Panel from "./Panel";
import Status from "./Status";
import TimeObj from "./TimeObj";
import Hammer from "react-hammerjs";
import ActionButton from "./ActionButton";
import { FiCircle } from "react-icons/fi";

export default function Header() {
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => state.header);

  return (
    <>
      {header.active && (
        <>
          <Panel />
          <Hammer
            onSwipeDown={() => dispatch(setPanelActive(true))}
            direction="DIRECTION_DOWN"
          >
            <div
              className={`absolute top-0 z-20 flex w-full flex-col text-center text-sm ${
                header.switchStyle ? "text-gray-800" : "text-gray-100"
              }`}
            >
              <div className="flex items-center justify-between px-3 py-1">
                <div className="flex items-center">
                  {header.displayMenu && (
                    <ActionButton className="mr-1 p-[6px] active:bg-gray-100/10">
                      <FiCircle />
                    </ActionButton>
                  )}
                  <TimeObj className="mr-2" />
                </div>
                <Status onClick={() => dispatch(setPanelActive(true))} />
              </div>
            </div>
          </Hammer>
        </>
      )}
    </>
  );
}
