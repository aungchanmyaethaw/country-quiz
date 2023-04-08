import React from "react";
import Trophy from "../assets/trophy.png";
import { useAppContext } from "../contexts/AppContextProvider";
const ResultCard = () => {
  const { points, setIsContinue, setPoints, setIsStarted } = useAppContext();

  const handleTryAgain = () => {
    setIsContinue(true);
    setPoints(0);
    setIsStarted(false);
  };

  return (
    <article className="p-4  bg-white w-[25rem] rounded flex flex-col items-center">
      <div className="w-[12rem] h-[12rem] rounded-full bg-amber-100 flex justify-center items-center mb-4">
        <img
          src={Trophy}
          alt="trophy"
          className="w-[8rem] h-[8rem] object-cover"
        />
      </div>
      <h2 className="mb-4 text-3xl font-semibold text-gray-600">Results</h2>
      <p className="mb-4 text-lg font-semibold text-gray-600">
        You got{" "}
        <span className="text-xl font-bold text-emerald-400">{points}</span>{" "}
        correct answers.
      </p>
      <button
        className="w-full py-2 text-lg font-semibold text-gray-600 border-2 border-gray-600 rounded"
        onClick={handleTryAgain}
      >
        Try Again
      </button>
    </article>
  );
};

export default ResultCard;
