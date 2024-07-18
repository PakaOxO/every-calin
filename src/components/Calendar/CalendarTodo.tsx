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
        background: #aaa;
        border-radius: 4px;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
      `}
      key={todo.cId}
      onClick={selectTodoHandler}
    >
      {todo.title}
    </div>
  );
};

export default CalendarTodo;

