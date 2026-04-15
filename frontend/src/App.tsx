import RoutesConfig from "./routesConfig";
import { HeroUIProvider } from "@heroui/react";

export default function App() {

  return (
    <HeroUIProvider>
      <RoutesConfig />
    </HeroUIProvider>
  )
}
