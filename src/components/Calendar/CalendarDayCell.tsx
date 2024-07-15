/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IProps {
  day: string;
}

const CalendarDayCell = ({ day }: IProps) => {
  return (
    <div
      css={css`
        box-sizing: border-box;
        width: 14.28%;
        text-align: right;
        padding: 0 4px;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* 인터넷익스플로러 */
        user-select: none;
      `}
    >
      <span>{day}</span>
    </div>
  );
};

export default CalendarDayCell;

