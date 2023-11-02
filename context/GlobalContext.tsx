"use client";

import { createContext, useState } from "react";

interface GlobalContextProps {
  children: React.ReactNode;
}

interface MyContextData {}

export const GlobalContext = createContext<MyContextData | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [spinner, setSpinner] = useState<boolean>(false);
  const [dataValue , setDataValue] = useState([]);

  return <GlobalContext.Provider value={{setSpinner , spinner , dataValue , setDataValue}}>{children}</GlobalContext.Provider>;
};
