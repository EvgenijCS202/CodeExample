const numWordEnding = (num: number, ending: string[]) => {
  if (num % 100 > 10 && num % 100 < 20) return ending[2];
  const last = num % 10;
  if (last === 1) return ending[0];
  if (last === 2 || last === 3 || last === 4) return ending[1];
  return ending[2];
};

export default numWordEnding;
