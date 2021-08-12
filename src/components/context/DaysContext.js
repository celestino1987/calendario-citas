import React, { createContext, useState } from "react";

export const DaysContext = createContext();

export const DataProvider = ({ children }) => {
  const [days, setDays] = useState(new Array(30).fill(""));
  return (
    <DaysContext.Provider
      value={{
        days,
        setDays,
      }}
    >
      {children}
    </DaysContext.Provider>
  );
};
