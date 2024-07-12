/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import CalendarController from './CalendarController';

interface IProps {
  date: Date;
}

const CalendarHeader = React.memo(({ date }: IProps) => {
  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        height: 60px;
        padding: 12px 8px;
        box-sizing: border-box;
      `}
    >
      <span
        css={css`
          font-size: 2rem;
          font-weight: 700;
        `}
      >{`${year}년 ${month}월`}</span>
      <CalendarController date={date} />
    </div>
  );
});

export default CalendarHeader;

