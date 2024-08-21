const dateToString = (date: Date) => {
  return `${date.getFullYear()}-${date.toLocaleString('ru-ru', {
    month: '2-digit',
  })}-${date.toLocaleString('ru-ru', {
    day: '2-digit',
  })}`;
};

export default dateToString;
