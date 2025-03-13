"use client";
import { useState } from "react";
import { validWords } from "./data/swedish_words";

const getRandomLetters = (num: number) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÅÖ";
  return Array.from(
    { length: num },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  );
};

interface HomeProps {
  wordSet: string[];
}

export default function Home() {
  // const wordSet = await loadWords();
  const [letters, setLetters] = useState(getRandomLetters(12));
  const [word, setWord] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [firstLetter, setFirstLetter] = useState(getRandomLetters(1));

  const handleSubmit = () => {
    const lowerWord = (firstLetter + word.join("")).toLowerCase();
    if (validWords.includes(lowerWord)) {
      setScore(score + lowerWord.length);
      setMessage("✅ Valid Word!");
      setSubmittedWords([...submittedWords, lowerWord]);
      setLetters(getRandomLetters(12));
      setFirstLetter(getRandomLetters(1));
    } else {
      setMessage("❌ Invalid Word!");
      handleReset();
    }

    handleReset();
  };

  const handleReset = () => {
    setWord([]);
    setSelectedIndices([]);
  };

  const handleRefresh = () => {
    setLetters(getRandomLetters(12));
    setSelectedIndices([]);
  };

  return (
    <div className="p-4 text-center flex flex-col items-center m-10">
      <h1 className="text-2xl font-bold">Svenska WordFlow Game</h1>
      <p className="text-xl my-4">Score: {score}</p>

      {/* <div className="grid grid-cols-4 gap-2 text-lg font-bold mt-5">
        {submittedWords.map((word, index) =>
          word.map((char: string) => (
            <div
              key={index}
              className="p-2 border rounded bg-gray-200 center"
              style={{ maxWidth: "60px" }}
            >
              {char}
            </div>
          ))
        )}
      </div> */}

      <div
        className="grid grid-cols-8 gap-2 text-lg font-bold mt-5"
        style={{ maxWidth: "400px" }}
      >
        <div
          className="p-2 border rounded bg-gray-200 center"
          style={{ maxWidth: "60px" }}
        >
          {firstLetter}
        </div>

        {word.map((char: string, index) => (
          <div
            key={index}
            className="p-2 border rounded bg-gray-200 center"
            style={{ maxWidth: "60px" }}
          >
            {char}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap -1">
        <button
          onClick={handleSubmit}
          className="ml-2 p-2 bg-blue-500 text-white mt-2 mb-2 border rounded"
        >
          Submit
        </button>

        <button
          onClick={handleReset}
          className="ml-2 p-2  text-blue-500 mt-2 mb-2 border solid rounded"
        >
          Clear
        </button>
      </div>

      <button
        onClick={handleRefresh}
        className="ml-2 p-2  text-blue-500 mt-2 mb-2 border solid rounded"
      >
        Refresh
      </button>
      <div className="grid grid-cols-6 gap-2 text-lg font-bold center mb-2 pt-5">
        {letters.map((char: string, index) => (
          <div
            key={index}
            className={`p-4 border rounded ${
              selectedIndices.includes(index)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              //remove that char if the index is already selected
              if (selectedIndices.includes(index)) {
                setSelectedIndices(selectedIndices.filter((i) => i != index));
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

      <p className="mt-2">{message}</p>
    </div>
  );
}
