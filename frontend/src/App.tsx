import RoutesConfig from "./routesConfig";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "sonner";

export default function App() {

  return (
    <HeroUIProvider>
      <Toaster position="bottom-right" richColors closeButton />
        <RoutesConfig />
    </HeroUIProvider>
  )
}
