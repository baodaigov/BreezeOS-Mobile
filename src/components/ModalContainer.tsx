import PowerMenu from "@/containers/modal/PowerMenu.tsx";
import BatteryNotFound from "@/containers/modal/BatteryNotFound";

export default function ModalContainer() {
  return (
    <>
      <PowerMenu />
      <BatteryNotFound />
    </>
  );
}
