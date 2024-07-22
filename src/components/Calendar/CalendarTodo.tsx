/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { selectedTodoState, Todo } from '../../atom/Todo';
import { useSetRecoilState } from 'recoil';

interface IProps {
  todo: Todo;
}

const CalendarTodo = ({ todo }: IProps) => {
  const setSelected = useSetRecoilState(selectedTodoState);

  const selectTodoHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelected(todo);
  };

  return (
    <div
      css={css`
        width: 100%;
        height: 1.2rem;
        padding: 6px;
        margin-bottom: 1px;
        background: ${todo.color};
        border-radius: 4px;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* 인터넷익스플로러 */
        user-select: none;
      `}
      key={todo.id}
      onClick={selectTodoHandler}
      onDoubleClick={selectTodoHandler}
    >
      <p
        css={css`
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {todo.title}
      </p>
    </div>
  );
};

export default CalendarTodo;

