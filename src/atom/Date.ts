import { atom, selector } from 'recoil';
import useCalendar from '../hooks/useCalendar';

export const currDateState = atom<Date>({
  key: 'currDate',
  default: new Date(),
});

export const currMonthDatesState = selector<Date[][]>({
  key: 'currMonthDatesState',
  get: ({ get }) => {
    const { getThisMonth } = useCalendar();
    const date = get(currDateState);
    const dates = getThisMonth(date, 6);

    return dates;
  },
});

