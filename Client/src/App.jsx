import { ConfigProvider, theme } from "antd";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, themeContext } from "./Context/themeContext";
import { router } from "./Router";
import { useContext } from "react";

const AppContent = () => {
  const { darkMode } = useContext(themeContext);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#722ed1",
          colorInfo: "#722ed1",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
