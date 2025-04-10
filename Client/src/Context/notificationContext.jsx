import { createContext, useContext } from "react";
import { notification } from "antd";

export const notificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const notify = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  return (
    <notificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </notificationContext.Provider>
  );
};

export default function useNotify(){
  return useContext(notificationContext)
}