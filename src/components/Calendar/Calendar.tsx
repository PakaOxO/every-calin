/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import useCalendar from '../../hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currDateState } from '../../atom/Date';
import CalendarTopMenu from './CalendarTopMenu';
import CalendarSettingMenu from './CalendarSettingMenu';
import { settingMenuState, todoMenuState } from '../../atom/Menu';
import CalendarTodoMenu from './CalendarTodoMenu';
import { selectedTodoState, Todo } from '../../atom/Todo';

const Calendar = () => {
  const currDate = useRecoilValue<Date>(currDateState);
  const { days, getThisMonth, getCategoryList, addCategory, updateCategory, deleteCategory, createTodo, updateTodo } =
    useCalendar();
  const dates: Date[][] = useMemo(() => getThisMonth(currDate, 6), [currDate]);
  const leftMenuIsOpen = useRecoilValue<boolean>(settingMenuState);
  const rightMenuIsOpen = useRecoilValue<boolean>(todoMenuState);
  const [selectedTodo, setSelectedTodo] = useRecoilState<Todo | null>(selectedTodoState);

  useEffect(() => {
    getCategoryList();
  }, []);

  const resetSelectedTodoHandler = () => {
    if (!!!selectedTodo) return;
    setSelectedTodo(null);
  };

  return (
    <div
      css={css`
        margin: 0 auto;
        width: 100%;
        display: flex;
        overflow: hidden;
      `}
    >
      <section
        css={css`
          width: ${leftMenuIsOpen ? '240px' : '0px'};
          overflow: hidden;
          transition: width 0.3s ease;
          border-right: 1px solid #aaa;
          margin-left: -1px;
        `}
      >
        <CalendarSettingMenu
          categoryAddHandler={addCategory}
          categoryUpdateHandler={updateCategory}
          categoryDeleteHandler={deleteCategory}
        />
      </section>
      <section
        css={css`
          margin: 0 auto;
          width: calc(100% - 240px - 240px);
          max-width: 980px;
        `}
        onClick={resetSelectedTodoHandler}
      >
        <CalendarTopMenu />
        <CalendarHeader date={currDate} />
        <CalendarBody days={days} dates={dates} todoCreateHandler={createTodo} />
      </section>
      <section
        css={css`
          width: ${rightMenuIsOpen ? '240px' : '0px'};
          overflow: hidden;
          transition: width 0.3s ease;
          border-left: 1px solid #aaa;
          margin-right: -1px;
        `}
      >
        <CalendarTodoMenu todoUpdateHandler={updateTodo} />
      </section>
    </div>
  );
};

export default Calendar;

