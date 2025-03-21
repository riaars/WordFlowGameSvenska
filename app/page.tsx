"use client";
import { useEffect, useState } from "react";
import { validWords } from "../data/swedish_words";
import { LuRefreshCcw } from "react-icons/lu";
import { FaFireAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import ProgressBar from "../components/ProgressBar";
import Dialog from "../components/Dialog";

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
  const [pointType, setPointType] = useState<
    "normal" | "positive" | "negative"
  >("normal");
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeoutDuration, setTimeoutDuration] = useState(60000);
  const [adjustmentScore, setAdjustmentScore] = useState(0);
  const [finishGameDialog, setFinishGameDialog] = useState(false);

  let interval: any;
  let timeoutId: any;

  const generateRandomLetters = () => {
    const { wordLetters, randomWord, firstLetter } =
      getRandomLetters(validWords);
    console.log(randomWord);
    setLetters(wordLetters);
    setRandomWord(randomWord);
    setFirstLetter(firstLetter);
  };
  useEffect(() => {
    generateRandomLetters();
  }, []);

  const handleSubmit = () => {
    const lowerWord = firstLetter + word.join("");
    const regex = new RegExp(`^${lowerWord}$`, "i");
    if (validWords.some((word) => regex.test(word))) {
      const newScore = score + lowerWord.length * 10;
      setScore(newScore);
      setPointType("positive");
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev + lowerWord.length);
        setTimeoutDuration(timeoutDuration + newScore * 100);
      }

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
    setPointType("negative");
  };

  const handleError = () => {
    const answer = document.getElementById("answer");
    answer?.classList.add("wrong-answer");

    setTimeout(() => {
      answer?.classList.remove("wrong-answer");
    }, 500);
  };

  const restartGame = () => {
    handleRefresh();
    setScore(0);
    setTimeLeft(60);
    setTimeoutDuration(60000);
    setFinishGameDialog(false);
    handleTimeLeft();
    setPointType("normal");
    setSubmittedWords([]);
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

  const handleTimeLeft = () => {
    if (!interval) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      clearInterval(interval);
    }, timeoutDuration);
  };

  useEffect(() => {
    handleTimeLeft();
  }, []);

  useEffect(() => {
    handleTimeLeft();
    return () => {
      if (interval) clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutDuration]);

  // reset point type
  useEffect(() => {
    setTimeout(() => {
      setPointType("normal");
    }, 5000);
  }, [timeoutDuration, handleRefresh, handleSubmit]);

  useEffect(() => {
    if (timeLeft === 0) {
      setFinishGameDialog(!finishGameDialog);
    }
  }, [timeLeft]);

  let percentage = (timeLeft / 60) * 100;

  return (
    <div className="text-center flex flex-row justify-center h-screen">
      <div className="flex flex-col items-center p-4 w-96 bg-white ">
        <div className="top-0 mb-5">
          <h1 className="text-2xl font-bold">Svenska WordFlow!</h1>
          <div className="flex flex-row justify-between ">
            <div className="flex flex-row gap-1 justify-center items-center text-md mb-5 mt-5">
              <FaFireAlt />
              {score}
            </div>
            <div
              className={`${
                timeLeft <= 5 ? "text-red-500" : "inherit"
              } flex flex-row gap-1 justify-center items-center text-md mb-5 mt-5`}
            >
              <IoTimeOutline />
              <span>{timeLeft}s</span>
            </div>
          </div>
          <ProgressBar percentage={percentage} pointType={pointType} />
        </div>
        <div className="h-48 overflow-y-auto scrollbar-hide">
          <div id="score-container" className="flex flex-col gap-2">
            {submittedWords.map((word, index) => (
              <div
                key={index}
                className="flex flex-row gap-1 p-0 text-lg font-bold"
              >
                {word.split("").map((char: string, index: number) => (
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
        </div>

        <div className="flex flex-col items-center bottom-0 absolute bg-white z-1 ">
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
      {finishGameDialog && (
        <Dialog
          title="Game Over"
          content={`Your score is ${score}`}
          toggleDialog={() => setFinishGameDialog(!finishGameDialog)}
          restart={() => restartGame()}
        />
      )}
    </div>
  );
}
