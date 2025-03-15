"use client";
import { useEffect, useState } from "react";
import { validWords } from "./data/swedish_words";
import { LuRefreshCcw } from "react-icons/lu";
import { FaFireAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const getRandomLetters = (
  validWords: string[],
  numLetters: number = 12
): any => {
  const randomWord =
    validWords[Math.floor(Math.random() * validWords.length)].toUpperCase();
  const wordLetters = randomWord.toUpperCase().split("");

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÅÖ";

  while (wordLetters.length < numLetters) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    wordLetters.push(randomLetter);
  }
  return {
    wordLetters: wordLetters.sort(() => Math.random() - 0.5),
    randomWord: randomWord,
    firstLetter: randomWord[0],
  };
};

export default function Home() {
  const [letters, setLetters] = useState<string[]>([]);
  const [firstLetter, setFirstLetter] = useState<string>("");
  const [randomWord, setRandomWord] = useState<string>("");

  const [word, setWord] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const generateRandomLetters = () => {
    const { wordLetters, randomWord, firstLetter } =
      getRandomLetters(validWords);

    setLetters(wordLetters);
    setRandomWord(randomWord);
    setFirstLetter(firstLetter);
  };
  useEffect(() => {
    generateRandomLetters();
  }, []);

  const handleSubmit = () => {
    const lowerWord = (firstLetter + word.join("")).toLowerCase();
    if (validWords.includes(lowerWord)) {
      setScore(score + lowerWord.length);
      setSubmittedWords([...submittedWords, lowerWord.toUpperCase()]);
      generateRandomLetters();
      showFlyingScore(lowerWord.length.toString());
      handleReset();
    } else {
      handleError();
    }
  };

  const handleReset = () => {
    setWord([]);
    setSelectedIndices([]);
  };

  const handleRefresh = () => {
    setWord([]);
    setSelectedIndices([]);
    generateRandomLetters();
  };

  const handleError = () => {
    const answer = document.getElementById("answer");
    answer?.classList.add("wrong-answer");

    setTimeout(() => {
      answer?.classList.remove("wrong-answer");
    }, 500);
  };

  const showFlyingScore = (points: string) => {
    const container = document.getElementById("score-container");
    const scoreElement = document.createElement("div");
    scoreElement.classList.add("flying-score");
    scoreElement.textContent = parseInt(points) > 0 ? `+${points}` : points;

    scoreElement.style.left = `${Math.random() * 80 + 10}%`;

    container?.appendChild(scoreElement);

    setTimeout(() => {
      scoreElement.remove();
    }, 1000);
  };

  return (
    <div className="text-center flex flex-row justify-center h-screen">
      <div className="flex flex-col items-center p-4 w-96 bg-white ">
        <div className="top-0">
          <h1 className="text-2xl font-bold">Svenska WordFlow!</h1>
          <div className="flex flex-row gap-1 justify-center items-center text-lg mb-5 mt-5">
            <FaFireAlt />
            {score}
          </div>
        </div>
        <div
          id="score-container"
          className="flex flex-col gap-2 overflow-y-auto"
        >
          {submittedWords.map((word, index) => (
            <div className="flex flex-row gap-1 p-0 text-lg font-bold bg-scroll">
              {word.split("").map((char: string) => (
                <div
                  key={index}
                  className="p-2 border rounded bg-gray-200 center"
                >
                  {char}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center bottom-0 absolute bg-white z-10 ">
          <div
            id="answer"
            className={`grid grid-cols-8 gap-2 text-lg font-bold mt-5 mb-5`}
          >
            <div className="p-2 border rounded center bg-blue-500 text-white">
              {firstLetter}
            </div>

            {word.map((char: string, index) => (
              <div
                key={index}
                className="p-2 border rounded bg-blue-300 text-white center"
              >
                {char}
              </div>
            ))}
            <div className="p-2 border-2 border-dashed border-blue-600  rounded center text-white">
              {""}
            </div>
          </div>

          <div className="flex flex-row self-stretch justify-between">
            <button
              onClick={handleRefresh}
              className="ml-2 p-2 text-blue-500 mt-2 mb-2 border solid rounded"
            >
              <LuRefreshCcw />
            </button>

            <div className="flex flex-row self-end">
              {word.length > 0 && (
                <button
                  onClick={handleReset}
                  className="ml-2 p-2 text-blue-500 mt-2 mb-2 border solid rounded"
                >
                  <FaRegTrashCan />
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="ml-2 p-2 bg-green-500 text-white mt-2 mb-2 border rounded"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2 text-lg font-bold center mb-2 pt-5 ">
            {letters.map((char: string, index: number) => (
              <div
                key={index}
                className={`p-4 border rounded cursor-pointer ${
                  selectedIndices.includes(index)
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => {
                  if (selectedIndices.includes(index)) {
                    setSelectedIndices(
                      selectedIndices.filter((i) => i != index)
                    );
                    setWord(word.filter((item) => item !== char));
                  } else {
                    setWord([...word, char]);
                    setSelectedIndices([...selectedIndices, index]);
                  }
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
