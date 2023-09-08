import { twMerge } from "tailwind-merge";

interface ToggleProps {
  active: boolean;
  disabled?: boolean;
  onToggle: React.MouseEventHandler<HTMLDivElement>;
}

export default function Toggle({ active, disabled, onToggle }: ToggleProps) {
  return (
    <div
      className={twMerge(
        "flex h-6 w-11 items-center rounded-full p-[2px] transition-all duration-300",
        active ? "bg-blue-600" : "bg-zinc-900/10 dark:bg-zinc-100/5",
        disabled && "opacity-50",
      )}
      onClick={onToggle}
    >
      <div
        className={twMerge(
          "h-5 w-5 active:w-6 rounded-full bg-zinc-100 transition-all duration-300",
          active && "translate-x-full active:w-5",
        )}
      ></div>
    </div>
  );
}

//
