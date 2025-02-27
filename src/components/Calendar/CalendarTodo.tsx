/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { selectedTodoRefState, selectedTodoState, Todo } from '../../atom/Todo';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface IProps {
  todo: Todo;
}

// forwardRef를 사용하여 ref를 전달함
const CalendarTodo = React.forwardRef(({ todo }: IProps, ref: React.ForwardedRef<HTMLDivElement> | undefined) => {
  const [selected, setSelected] = useRecoilState(selectedTodoState);
  const setSelectedTodoRef = useSetRecoilState(selectedTodoRefState);

  const selectTodoHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelected(todo);
  };

  useEffect(() => {
    if (selected && selected.id === todo.id) {
      if (ref && typeof ref !== 'function' && ref.current !== null) {
        setSelectedTodoRef(ref.current);
      }
    }
  }, [selected]);

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
      ref={ref}
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
});

export default CalendarTodo;

