import React, { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContextProvider";
import { useGetCountriesWithFlag } from "../hooks/useCountries";

const FlagQuiz = () => {
  const { nextQuestion, id, setPoints, setIsContinue } = useAppContext();

  const { data: countries, isLoading, isSuccess } = useGetCountriesWithFlag();
  const [isAnswered, setIsAnswer] = useState(false);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [currentAns, setCurrentAns] = useState({});
  const [wrongChoiceIndex, setWrongChoiceIndex] = useState(null);
  const [message, setMessage] = useState({ text: "", cls: "" });
  useEffect(() => {
    if (isSuccess) {
      const tempArr = [];

      for (let i = 0; i < countries.length; i++) {
        if (tempArr.length < 4) {
          const randomNo = Math.floor(Math.random() * countries.length);

          const currentCountry = countries[randomNo];

          if (
            !tempArr.find((country) => country.name === currentCountry.name)
          ) {
            tempArr.push(currentCountry);
          }
        }
      }
      setCurrentChoices(tempArr);
    }
  }, [id, isSuccess]);

  useEffect(() => {
    if (currentChoices.length === 4) {
      const randomNo = Math.floor(Math.random() * 4);
      const tempCountry = currentChoices.find((_, index) => index === randomNo);
      setCurrentAns(tempCountry);
    }
  }, [currentChoices]);

  if (isLoading && currentChoices.length < 4) {
    return <div>Loading...</div>;
  }

  const handleCheckAnswer = (answer, index) => {
    setIsAnswer(true);
    if (answer === currentAns.name) {
      setPoints((prev) => prev + 1);
      setMessage({ text: "Correct!!!", cls: "text-emerald-400" });
    } else {
      setWrongChoiceIndex(index);
      setMessage({ text: "Wrong!!!", cls: "text-red-400" });
    }
  };

  const handleNextQuestion = () => {
    setIsContinue(wrongChoiceIndex === null ? true : false);
    nextQuestion();
    setWrongChoiceIndex(null);
    setIsAnswer(false);
  };

  return (
    <div>
      <h2 className="mb-2 text-xl font-bold text-white">Country Quiz</h2>
      <article className="p-4  bg-white w-[20rem] rounded ">
        <div>
          <img src={currentAns.flag} alt="flag" className="mb-4" />
          <h2
            className={`${
              !isAnswered ? "mb-8" : null
            } text-xl font-bold text-gray-600`}
          >
            Which country dose this flag belong to?
          </h2>
        </div>
        {isAnswered ? (
          <div className={`font-bold text-lg text-center my-4 ${message.cls}`}>
            {message?.text}
          </div>
        ) : null}
        <ul className="flex flex-col gap-4 ">
          {currentChoices.map((country, index) => (
            <li
              key={country.name}
              className={`hover:bg-orange-400 hover:text-white  p-2 font-medium border rounded cursor-pointer ${
                isAnswered && country.name === currentAns.name
                  ? "bg-emerald-400 bg-opacity-50 border border-emerald-600"
                  : ""
              } ${isAnswered ? "pointer-events-none" : ""} ${
                isAnswered && wrongChoiceIndex === index
                  ? "!bg-red-400 bg-opacity-50 border border-red-600"
                  : null
              } `}
              onClick={() => handleCheckAnswer(country.name, index)}
            >
              <span className="mr-2 ">
                {index === 0
                  ? "A."
                  : index === 1
                  ? "B."
                  : index === 2
                  ? "C."
                  : "D."}
              </span>
              {country.name}
            </li>
          ))}
        </ul>
        {isAnswered ? (
          <button
            className="block px-4 py-2 mt-4 ml-auto text-white bg-orange-500 rounded-lg"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : null}
      </article>
    </div>
  );
};

export default FlagQuiz;
