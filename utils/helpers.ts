export const getRandomLetters = (
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
