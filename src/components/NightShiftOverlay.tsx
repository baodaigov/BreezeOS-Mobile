import { useAppSelector } from "@/store/hooks";

export default function NightShiftOverlay() {
  const nightShift = useAppSelector((state) => state.settings.nightShift);
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-[9999] h-screen w-full bg-amber-500 transition-all duration-[1500ms]"
      style={{ opacity: nightShift.active ? nightShift.level : 0 }}
    ></div>
  );
}
