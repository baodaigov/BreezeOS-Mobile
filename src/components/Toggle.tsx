import { twMerge } from "tailwind-merge";

interface ToggleProps {
  active: boolean;
  disabled?: boolean;
  size?: number;
  onToggle: React.MouseEventHandler<HTMLDivElement>;
}

export default function Toggle({
  active,
  disabled,
  size = 16,
  onToggle,
}: ToggleProps) {
  return (
    <div
      className={twMerge(
        "flex items-center rounded-full p-1 transition-all duration-300",
        active ? "bg-blue-600" : "bg-zinc-900/10 dark:bg-zinc-100/5",
        disabled && "pointer-events-none opacity-50",
      )}
      style={{ width: `${size + 31}px`, height: `${size + 8}px` }}
      onClick={onToggle}
    >
      <div className="relative flex w-full items-center">
        <div
          className={`absolute ${active ? "right-0" : "left-0"} rounded-full bg-zinc-100 transition-all duration-300`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
          }}
        ></div>
      </div>
    </div>
  );
}
