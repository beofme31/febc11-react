import { RouterProvider } from "react-router-dom";
import router from "@/routes";
import useThemeStore from "@zustand/themeStore";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const { isDarkMode } = useThemeStore();

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <HelmetProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </HelmetProvider>
  );
}

export default App;
