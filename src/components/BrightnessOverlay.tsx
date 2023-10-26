import { useAppSelector } from "@/store/hooks";

export default function BrightnessOverlay() {
  const brightness = useAppSelector((state) => state.settings.brightness);
  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-[9999] h-screen w-full bg-black"
      style={{ opacity: (100 - brightness) / 100 }}
    ></div>
  );
}
