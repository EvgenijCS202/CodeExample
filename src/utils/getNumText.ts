const getNumText = (num: number) => {
  switch (num) {
    case 1:
      return 'первого';
    case 2:
      return 'второго';
    case 3:
      return 'третьего';
    case 4:
      return 'четвертого';
    case 5:
      return 'пятого';
    default:
      return `${num}`;
  }
};

export default getNumText;
