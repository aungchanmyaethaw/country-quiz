import { useContext, useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export function AppContextProvider({ children }) {
  const [isStarted, setIsStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [isContinue, setIsContinue] = useState(true);
  const [id, setId] = useState("");

  const nextQuestion = () => {
    setId(uuidv4());
  };
  const contextValue = {
    id,
    nextQuestion,
    setPoints,
    setIsContinue,
    isContinue,
    points,
    isStarted,
    setIsStarted,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
