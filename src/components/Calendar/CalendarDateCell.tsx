/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { currDateState } from '../../atom/Date';
import CalendarTodo from './CalendarTodo';
import { Todo } from '../../atom/Todo';
import { datetimeFormatter } from '../../core/date';

interface IProps {
  date: Date;
  todos: Todo[] | undefined;
  todoCreateHandler: (date: Date) => boolean;
  isToday: boolean;
}

const areEqualProps = (prevProps: IProps, nextProps: IProps): boolean => {
  if (datetimeFormatter(prevProps.date) !== datetimeFormatter(nextProps.date)) return false;
  if (prevProps.todos?.length !== nextProps.todos?.length) return false;

  if (prevProps.todos && nextProps.todos) {
    for (let i = 0; i < prevProps.todos.length; i++) {
      if (prevProps.todos[i].title !== nextProps.todos[i].title) return false;
      if (prevProps.todos[i].category !== nextProps.todos[i].category) return false;
      if (prevProps.todos[i].color !== nextProps.todos[i].color) return false;
      if (prevProps.todos[i].desc !== nextProps.todos[i].desc) return false;
    }
  }

  return true;
};

const CalendarDateCell = React.memo(({ date, todos, todoCreateHandler, isToday }: IProps) => {
  const currDate = useRecoilValue<Date>(currDateState);
  const isThisMonth = currDate.getMonth() === date.getMonth();

  return (
    <div
      css={css`
        flex: 1;
        height: 101%;
        border: 1px solid #aaa;
        margin-top: -1px;
        margin-right: -1px;
        overflow: hidden;

        &:hover {
          cursor: pointer;
        }
      `}
      onDoubleClick={() => todoCreateHandler(date)}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        <p
          css={css`
            position: relative;
            margin: 0;
            padding: 4px;
            display: flex;
            justify-content: flex-end;
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
        <div
          css={css`
            width: 100%;
            padding: 0 1px;
          `}
        >
          {todos && todos.map((todo) => <CalendarTodo key={todo.id} todo={todo} />)}
        </div>
      </div>
    </div>
  );
}, areEqualProps);

export default CalendarDateCell;

