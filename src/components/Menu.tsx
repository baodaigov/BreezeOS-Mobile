import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openApp, setMenuActive } from "../store/reducers/global";
import { twMerge } from "tailwind-merge";

export default function Menu() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.global.menu);
  const apps = useAppSelector((state) => state.global.apps);
  const wallpaper = useAppSelector((state) => state.global.wallpaper);
  const [searchQuery, setSearchQuery] = useState<string>("");

  function open(id: string) {
    dispatch(setMenuActive(false));
    setTimeout(() => dispatch(openApp(id)), 250);
  }

  interface AppProps {
    icon: string;
    name: string;
    onClick: React.MouseEventHandler<HTMLImageElement>;
  }

  const App: React.FC<AppProps> = ({ icon, name, onClick }) => {
    return (
      <div className="flex flex-col text-center items-center mb-12">
        <img
          className="active:brightness-75"
          width={48}
          height={48}
          src={icon}
          onClick={onClick}
        />
        <p className="text-xs mt-2">{name}</p>
      </div>
    );
  };

  const filterData = apps.filter((app) => {
    if (searchQuery === "") {
      return app;
    } else {
      return app.name.toLowerCase().includes(searchQuery);
    }
  });

  return (
    <div
      className={twMerge(
        "z-20 absolute bg-center bg-no-repeat bg-cover h-screen w-full opacity-0 pointer-events-none transition-all ease-in",
        menu.active && "opacity-100 pointer-events-auto"
      )}
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="h-screen bg-black/60 text-gray-100 backdrop-blur-lg pb-16 flex flex-col">
        <div className="flex justify-center w-full px-6 py-8 relative bottom-0">
          <input
            className="appearance-none border-none outline-none py-3 px-5 bg-zinc-100/5 flex items-center rounded-full text-xs w-56 text-zinc-100 transition-all duration-300 placeholder:text-zinc-100/20 focus:w-80"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="p-5 flex flex-col">
          <div className="grid grid-cols-4 justify-between">
            {filterData.map((e) => (
              <App
                icon={e.icon}
                name={e.name}
                onClick={() => open(e.id)}
                key={Math.random()}
              />
            ))}
            <App
              icon="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"
              name="GitHub"
              onClick={() =>
                (window.location.href =
                  "https://github.com/baodaigov/BreezeOS-Mobile")
              }
              key={Math.random()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
