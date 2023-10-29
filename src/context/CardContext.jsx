import React, { createContext, useContext, useState } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  return (
    <CardContext.Provider value={{ isCardFlipped, setIsCardFlipped }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  return useContext(CardContext);
};
