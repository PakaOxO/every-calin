/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import useCalendar from '../../hooks/useCalendar';

const Calendar = () => {
  const { getThisMonth } = useCalendar();
  const today = new Date();
  const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const dates = getThisMonth(prev, 6);
  console.log(dates.join('\n'));

  return (
    <div
      css={css`
        width: 300px;
        height: 300px;
        background-color: skyblue;
      `}
    ></div>
  );
};

export default Calendar;

