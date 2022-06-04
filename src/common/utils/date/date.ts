import { ParsingDate } from './date.type';

const getParsingDate = (today: Date): ParsingDate => {
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

/**
 * 타임존 적용을 위한 함수
 * @returns 한국시간으로 적용된 시간으로 Date 리턴
 */
const getNowDate = (): Date => {
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return date;
};

export { getParsingDate, getNowDate };
