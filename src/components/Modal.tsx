import { twMerge } from "tailwind-merge";
import ActionButton from "./ActionButton";

interface ModalProps {
  title: string;
  description: string;
  buttons: {
    value: string;
    disabled?: boolean;
    action: React.MouseEventHandler<HTMLButtonElement>;
  }[];
}

export default function Modal({ title, description, buttons }: ModalProps) {
  return (
    <div className="m-5 flex h-full w-96 items-center justify-center">
      <div className="rounded-md bg-zinc-100/90 px-6 py-4 text-left text-sm text-gray-800 backdrop-blur-md dark:bg-zinc-900/80 dark:text-gray-100 dark:backdrop-blur-md">
        <div className="my-1 mb-8">
          <p className="mb-3 text-base font-semibold">{title}</p>
          <p>{description}</p>
        </div>
        <div className="flex flex-row-reverse">
          <div className="flex">
            {buttons.map((i) => (
              <ActionButton
                className={twMerge(
                  "ml-2 rounded-full bg-transparent px-3 py-2 text-[#83aaff] transition-all duration-200 active:bg-[#83aaff]/20 active:transition-none dark:active:bg-[#83aaff]/10",
                  i.disabled && "pointer-events-none text-gray-100/10",
                )}
                onClick={i.action}
              >
                <p className="font-semibold">{i.value}</p>
              </ActionButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
