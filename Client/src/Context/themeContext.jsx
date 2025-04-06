import { createContext, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <themeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </themeContext.Provider>
  );
};
