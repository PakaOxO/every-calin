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

/**
 * Todo 드래그중 onDragEnter가 실행된 Date를 전역으로 저장
 */
export const dragOverDateState = atom<Date | null>({
  key: 'dragOverDateState',
  default: null,
})