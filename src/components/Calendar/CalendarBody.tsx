/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import CalendarDayCell from './CalendarDayCell';
import CalendarDateCell from './CalendarDateCell';

interface IProps {
  dates: Date[][];
}

const DAY = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarBody = React.memo(({ dates }: IProps) => {
  const today = new Date();

  return (
    <div
      css={css`
        width: 100%;
        height: calc(100vh - 40px - 60px);
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 32px;
        `}
      >
        {DAY.map((day, idx) => (
          <CalendarDayCell key={idx} day={day} />
        ))}
      </div>
      <div
        css={css`
          width: 100%;
          height: calc((100% - 32px) / 6);
          box-sizing: border-box;
        `}
      >
        {dates.map((week, weekIdx) => (
          <div
            key={weekIdx}
            css={css`
              width: 100%;
              height: 100%;
              display: flex;
            `}
          >
            {week.map((date, dateIdx) => (
              <CalendarDateCell
                key={`${weekIdx}-${dateIdx}`}
                date={date}
                isToday={
                  today.getFullYear() === date.getFullYear() &&
                  today.getMonth() === date.getMonth() &&
                  date.getDate() === today.getDate()
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default CalendarBody;

