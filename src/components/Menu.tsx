import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openApp, setMenuActive } from "@/store/reducers/global";
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
      <div className="mb-12 flex flex-col items-center text-center">
        <img
          className="active:brightness-75"
          width={48}
          height={48}
          src={icon}
          onClick={onClick}
        />
        <p className="mt-2 text-sm">{name}</p>
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
        "pointer-events-none absolute z-20 h-screen w-full bg-cover bg-center bg-no-repeat opacity-0 transition-all ease-in",
        menu.active && "pointer-events-auto opacity-100",
      )}
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      <div className="flex h-screen flex-col bg-black/60 pb-16 text-gray-100 backdrop-blur-lg">
        <div className="relative bottom-0 flex w-full justify-center px-6 py-8">
          <input
            className="flex w-56 appearance-none items-center rounded-full border-none bg-zinc-100/5 px-5 py-3 text-sm text-zinc-100 outline-none transition-all duration-300 placeholder:text-zinc-100/20 focus:w-80"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col p-5">
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
