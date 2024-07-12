/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { currDateState } from '../../atom/Date';

interface IProps {
  date: Date;
  isToday: boolean;
}

const CalendarDateCell = React.memo(({ date, isToday }: IProps) => {
  const currDate = useRecoilValue<Date>(currDateState);
  console.log(currDate.getMonth(), date.getMonth());
  const isThisMonth = currDate.getMonth() === date.getMonth();

  return (
    <div
      css={css`
        width: 14.4%;
        height: 100px;
        border: 1px solid #aaa;
        box-sizing: border-box;
        margin-right: -1px;
        margin-bottom: -1px;

        &:hover {
          cursor: pointer;
        }
      `}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 4px;
          box-sizing: border-box;
        `}
      >
        <p
          css={css`
            position: relative;
            margin: 0;
            height: 24px;
            display: flex;
            align-items: center;
            color: ${isThisMonth ? '#000' : '#aaa'};
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* 인터넷익스플로러 */
            user-select: none;
          `}
        >
          <span
            css={css`
              display: block;
              position: relative;
              top: -1px;
              width: ${isToday ? '24px' : 'auto'};
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 1rem;
              background: ${isToday ? '#f35d54' : ''};
            `}
          >
            {date.getDate()}
          </span>
          일
        </p>
      </div>
    </div>
  );
});

export default CalendarDateCell;

