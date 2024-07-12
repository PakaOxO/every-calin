/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import useCalendar from '../../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { useRecoilValue } from 'recoil';
import { currDateState } from '../../atom/Date';

const Calendar = () => {
  const { getThisMonth } = useCalendar();
  const currDate = useRecoilValue<Date>(currDateState);
  console.log(currDate);
  const dates: Date[][] = getThisMonth(currDate, 6);

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 100%;
        max-width: 960px;
      `}
    >
      <CalendarHeader date={currDate} />
      <CalendarBody dates={dates} />
    </div>
  );
};

export default Calendar;

