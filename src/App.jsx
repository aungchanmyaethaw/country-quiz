import React, { useEffect, useState } from "react";
import CapitalQuiz from "./components/CapitalQuiz";
import FlagQuiz from "./components/FlagQuiz";
import { useAppContext } from "./contexts/AppContextProvider";
import ResultCard from "./components/ResultCard";
const App = () => {
  const [isCapitalQuiz, setIsCapitalQuiz] = useState(null);
  const { id, isContinue, setIsStarted, isStarted } = useAppContext();

  useEffect(() => {
    const randomNo = Math.floor(Math.random() * 2);
    setIsCapitalQuiz(randomNo === 1);
  }, [id]);

  if (!isContinue) {
    return (
      <main className="grid w-full h-screen bg-indigo-500 bg-opacity-75 place-items-center">
        <ResultCard />
      </main>
    );
  }

  return (
    <main className="grid w-full h-screen bg-indigo-500 bg-opacity-75 place-items-center">
      {!isStarted ? (
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-2xl font-medium text-white">Country Quiz</h1>
          <button
            onClick={() => setIsStarted(true)}
            className="px-10 py-4 text-2xl text-white bg-orange-400 rounded-lg"
          >
            Start Game
          </button>
        </div>
      ) : (
        <section>{isCapitalQuiz ? <CapitalQuiz /> : <FlagQuiz />}</section>
      )}
    </main>
  );
};

export default App;
