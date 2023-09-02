import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FiCircle } from "react-icons/fi";
import { setMenuActive } from "../store/reducers/global";
import { openRecentTasks, setHome } from "../store/reducers/global";
import Menu from "./Menu";
import Keyboard from "./Keyboard";
import Hammer from "react-hammerjs";

export default function Footer() {
  const dispatch = useAppDispatch();
  const global = useAppSelector((state) => state.global);
  const footer = useAppSelector((state) => state.footer);
  const menuActive = useAppSelector((state) => state.global.menu.active);

  return (
    <>
      {footer.active && (
        <>
          {!global.recentTasks.active && <Menu />}
          {!global.recentTasks.active && <Keyboard />}
          <div className="z-20 absolute bottom-0 flex flex-col w-full text-gray-100">
            <div className="flex justify-center bg-gradient-to-b from-transparent to-black/40 px-5 text-lg">
              <div className="mb-1">
                <Hammer
                  onTap={() =>
                    global.recentTasks.active
                      ? dispatch(openRecentTasks(false))
                      : global.isHome
                      ? dispatch(setMenuActive(!menuActive))
                      : dispatch(setHome())
                  }
                  onPress={() => dispatch(openRecentTasks(true))}
                  options={{
                    recognizers: {
                      press: {
                        time: 500,
                      },
                    },
                  }}
                >
                  <div className="rounded-full flex justify-center items-center transition duration-75 p-2 active:bg-gray-100/10">
                    <FiCircle />
                  </div>
                </Hammer>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
