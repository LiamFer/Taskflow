import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setDarkMode(theme == "dark" ? true : false);
    } else {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <themeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </themeContext.Provider>
  );
};
