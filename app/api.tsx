"use server";
import fs from "fs";

export async function loadWords() {
  const words = fs
    .readFileSync("./data/swedish_words_million.txt", "utf8")
    .split("\n");
  return new Set(words.map((w: string) => w.trim()));
}

export async function getServerSideProps() {
  const wordSet = await loadWords();
  return {
    props: {
      wordSet: Array.from(wordSet), // Convert the Set to an array for passing as props
    },
  };
}
