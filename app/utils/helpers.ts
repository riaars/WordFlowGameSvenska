import fs from "fs";

let wordSet = new Set();

// Function to load words from the file
function loadWords() {
  const words = fs
    .readFileSync("./data/swedish_words_million.txt", "utf8")
    .split("\n");
  wordSet = new Set(words.map((w) => w.trim()));
}

export async function getServerSideProps() {
  if (wordSet.size === 0) loadWords(); // Load words only if not already loaded

  return {
    props: {
      wordSet: Array.from(wordSet), // Passing as an array
    },
  };
}
