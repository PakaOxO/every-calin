/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import useCalendar from '../../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currDateState } from '../../atom/Date';
import CalendarTopMenu from './CalendarTopMenu';
import CalendarSettingMenu from './CalendarSettingMenu';
import { settingMenuState, todoMenuState } from '../../atom/Menu';
import CalendarTodoMenu from './CalendarTodoMenu';
import { selectedTodoState, Todo } from '../../atom/Todo';

const Calendar = () => {
  const { getThisMonth } = useCalendar();
  const currDate = useRecoilValue<Date>(currDateState);
  const dates: Date[][] = getThisMonth(currDate, 6);
  const leftMenuIsOpen = useRecoilValue<boolean>(settingMenuState);
  const rightMenuIsOpen = useRecoilValue<boolean>(todoMenuState);
  const setSelectedTodo = useSetRecoilState<Todo | null>(selectedTodoState);

  const resetSelectedTodoHandler = () => {
    setSelectedTodo(null);
  };

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 100%;
        display: flex;
      `}
      onClick={resetSelectedTodoHandler}
    >
      <section
        css={css`
          width: ${leftMenuIsOpen ? '280px' : '0px'};
          overflow: hidden;
          transition: width 0.3s ease;
          border-right: 1px solid #aaa;
          margin-right: -1px;
        `}
      >
        <CalendarSettingMenu />
      </section>
      <section
        css={css`
          margin: 0 auto;
          width: 100%;
          max-width: 980px;
        `}
      >
        <CalendarTopMenu />
        <CalendarHeader date={currDate} />
        <CalendarBody dates={dates} />
      </section>
      <section
        css={css`
          width: ${rightMenuIsOpen ? '280px' : '0px'};
          overflow: hidden;
          transition: width 0.3s ease;
          border-left: 1px solid #aaa;
          margin-right: -1px;
        `}
      >
        <CalendarTodoMenu />
      </section>
    </div>
  );
};

export default Calendar;

