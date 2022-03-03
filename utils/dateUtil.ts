type getParsingDateReturnType = {
  year: string;
  month: string;
  date: string;
  day: string;
};

const getParsingDate = (today: Date): getParsingDateReturnType => {
  const year: string = today.getFullYear().toString().slice(2);
  const month: string = (today.getMonth() + 1).toString().padStart(2, '0');
  const date: string = today.getDate().toString().padStart(2, '0');
  const day: string = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][today.getDay()];

  return {
    year,
    month,
    date,
    day,
  };
};

export { getParsingDate };
