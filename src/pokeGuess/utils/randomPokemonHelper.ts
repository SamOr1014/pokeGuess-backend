export const generateRandomId: () => number = () => {
  // there are only 1025 pokemon so randomise 1025 number
  const randomNum = Math.ceil(Math.random() * 1025);
  return randomNum;
};

export const generateRandomFourId: () => Array<number> = () => {
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(generateRandomId());
  }
  return result;
};
